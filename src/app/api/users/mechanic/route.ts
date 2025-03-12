import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const userId = formData.get('userId') as string;
    const specialtiesRaw = formData.get('specialties') as string;
    const specialties = specialtiesRaw
      ? specialtiesRaw.split(',').map(service => service.trim())
      : [];
    const experience = formData.get('experience')
      ? parseInt(formData.get('experience') as string, 10)
      : 0;
    const cityId = formData.get('cityId') as string;
    const file = formData.get('photoUrl') as File | null;

    if (!userId || !specialties || !experience || !cityId) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes' },
        { status: 400 },
      );
    }

    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 },
      );
    }

    let photoUrl = null;
    if (file) {
      const filePath = path.join(process.cwd(), 'public/uploads', file.name);
      const buffer = await file.arrayBuffer();
      await writeFile(filePath, Buffer.from(buffer));
      photoUrl = `/uploads/${file.name}`;
    }

    const existingMechanic = await prisma.mechanic.findUnique({
      where: { userId: userId },
    });

    if (existingMechanic) {
      const updatedMechanic = await prisma.mechanic.update({
        where: { userId: userId },
        data: {
          specialties,
          experience,
          cityId,
          photoUrl,
        },
      });
      return NextResponse.json(updatedMechanic, { status: 200 });
    } else {
      const newMechanic = await prisma.mechanic.create({
        data: {
          userId,
          specialties,
          experience,
          cityId,
          photoUrl,
        },
      });
      return NextResponse.json(newMechanic, { status: 201 });
    }
  } catch (error) {
    console.error('Erro ao gravar dados do mecânico:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
