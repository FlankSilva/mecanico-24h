import { PaymentStatus, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

import { writeFile } from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

export async function GET(): Promise<Response> {
  try {
    const users = await prisma.user.findMany();

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const whatsapp = formData.get('whatsapp') as string;
    const address = formData.get('address') as string;
    const email = formData.get('email') as string;
    const password_hash = formData.get('password_hash') as string;
    const cityId = formData.get('cityId') as string;
    const commissionaireId = formData.get('commissionaireId') as string | null;
    const isAdmin = formData.get('isAdmin') === 'true';
    const paymentStatusString = formData.get('paymentStatus') as string;
    const paymentStatus = paymentStatusString as PaymentStatus;
    const servicesRaw = formData.get('services') as string;
    const services = servicesRaw ? servicesRaw.split(',') : [];

    // Processar o upload da imagem
    let photoUrl = null;
    const file = formData.get('photoUrl') as File | null;
    if (file) {
      const filePath = path.join(process.cwd(), 'public/uploads', file.name);
      const buffer = await file.arrayBuffer();
      await writeFile(filePath, Buffer.from(buffer));
      photoUrl = `/uploads/${file.name}`;
    }

    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 },
      );
    }

    // Verificar se o commissionaireId é válido
    let commissionaireExists = null;
    if (commissionaireId) {
      commissionaireExists = await prisma.commissionaire.findUnique({
        where: { id: commissionaireId },
      });
      if (!commissionaireExists) {
        return NextResponse.json(
          { error: 'Commissionaire não encontrado' },
          { status: 400 },
        );
      }
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        phone,
        whatsapp,
        address,
        email,
        password_hash,
        cityId,
        commissionaire: commissionaireExists
          ? { connect: { id: commissionaireExists.id } }
          : undefined,
        photoUrl,
        isAdmin,
        paymentStatus: paymentStatus || 'pending',
        services,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
