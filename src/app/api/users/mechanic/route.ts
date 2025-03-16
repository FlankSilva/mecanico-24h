import { PrismaClient } from '@prisma/client';
import { writeFile } from 'fs/promises';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import path from 'path';

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

    const existingMechanic = await prisma.mechanic.findUnique({
      where: { userId },
    });

    if (existingMechanic) {
      return NextResponse.json(
        { error: 'Mecânico já registrado' },
        { status: 400 },
      );
    }

    const formData = await req.formData();

    const specialtiesRaw = formData.get('specialties') as string;
    const specialties = specialtiesRaw
      ? specialtiesRaw.split(',').map(service => service.trim())
      : [];

    const cityId = formData.get('cityId') as string;
    const file = formData.get('photoUrl') as File | null;

    if (!specialties || !cityId) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes' },
        { status: 400 },
      );
    }

    let photoUrl = null;
    if (file) {
      const filePath = path.join(process.cwd(), 'public/uploads', file.name);
      const buffer = await file.arrayBuffer();
      await writeFile(filePath, Buffer.from(buffer));
      photoUrl = `/uploads/${file.name}`;
    }

    const newMechanic = await prisma.mechanic.create({
      data: {
        userId,
        specialties,
        cityId,
        photoUrl,
      },
    });

    return NextResponse.json(
      { message: 'Mecânico cadastrado com sucesso', mechanic: newMechanic },
      { status: 201 },
    );
  } catch (error) {
    console.error('Erro ao gravar dados do mecânico:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
