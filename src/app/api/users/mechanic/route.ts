import { PrismaClient, UserRole } from '@prisma/client';
import { writeFile } from 'fs/promises';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import path from 'path';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || 'secret';

export async function GET(req: Request) {
  try {
    const mechanics = await prisma.mechanic.findMany({
      include: {
        user: {
          select: {
            name: true,
            phone: true,
            address: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(mechanics, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar mecânicos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}

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

    const cityIdsRaw = formData.get('cityId') as string;
    const cityIds = cityIdsRaw
      ? cityIdsRaw.split(',').map(id => id.trim())
      : [];

    const file = formData.get('photoUrl') as File | null;

    if (!specialties || !cityIds || cityIds.length === 0) {
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

    const [newMechanic, updatedUser] = await prisma.$transaction([
      prisma.mechanic.create({
        data: {
          userId,
          specialties,
          cityId: cityIds,
          photoUrl,
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { role: UserRole.MECHANIC },
      }),
    ]);

    return NextResponse.json(
      {
        message: 'Mecânico cadastrado com sucesso',
        mechanic: newMechanic,
        user: updatedUser,
      },
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
