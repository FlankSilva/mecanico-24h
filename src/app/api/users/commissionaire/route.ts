import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || 'secret';

export async function POST(req: Request) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { error: 'Token de autenticação não fornecido' },
        { status: 401 },
      );
    }

    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
    const userId = decoded.id;

    // Verifica se o usuário já é um comissionário
    const existingCommissionaire = await prisma.commissionaire.findUnique({
      where: { userId },
    });

    if (existingCommissionaire) {
      return NextResponse.json(
        { error: 'Usuário já está cadastrado como comissionário' },
        { status: 400 },
      );
    }

    const uniqueCode = uuidv4();
    const newCommissionaire = await prisma.commissionaire.create({
      data: {
        userId,
        uniqueCode,
        referrals: 0,
        commission: 0,
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { role: 'COMMISSIONAIRE' },
    });

    return NextResponse.json(
      {
        message: 'Comissionário cadastrado com sucesso',
        uniqueCode: newCommissionaire.uniqueCode,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Erro ao criar comissionário:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
