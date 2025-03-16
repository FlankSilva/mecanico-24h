import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || 'secret'; // Defina essa variável no .env

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, address, email, password_hash } = body;

    if (!name || !email || !password_hash) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes' },
        { status: 400 },
      );
    }

    const newHashedPassword = await hash(password_hash, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        phone,
        address,
        email,
        password_hash: newHashedPassword,
      },
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      SECRET_KEY,
      {
        expiresIn: '1h',
      },
    );

    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
