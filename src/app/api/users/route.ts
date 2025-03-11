import { PaymentStatus, PrismaClient, UserRole } from '@prisma/client';
import { NextResponse } from 'next/server';

import { writeFile } from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

export async function GET(): Promise<Response> {
  try {
    const users = await prisma.user.findMany({
      include: {
        mechanic: true,
        commissionaire: true,
      },
    });

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
    const role = formData.get('role') as UserRole;
    const isAdmin = formData.get('isAdmin') === 'true';
    const paymentStatusString = formData.get('paymentStatus') as string;
    const paymentStatus = (paymentStatusString as PaymentStatus) || 'pending';
    const servicesRaw = formData.get('services') as string; // Capturando o campo services
    const services = servicesRaw
      ? servicesRaw.split(',').map(service => service.trim())
      : []; // Transformando em array

    if (!role || !Object.values(UserRole).includes(role)) {
      return NextResponse.json(
        { error: 'Role inválido. Use MECHANIC, COMMISSIONAIRE ou ADMIN' },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 },
      );
    }

    let commissionaireId = formData.get('commissionaireId') as string | null;
    let commissionaireExists = null;
    if (role === 'COMMISSIONAIRE' && commissionaireId) {
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

    let photoUrl = null;
    if (role === 'MECHANIC') {
      const file = formData.get('photoUrl') as File | null;
      if (file) {
        const filePath = path.join(process.cwd(), 'public/uploads', file.name);
        const buffer = await file.arrayBuffer();
        await writeFile(filePath, Buffer.from(buffer));
        photoUrl = `/uploads/${file.name}`;
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
        role,
      },
    });

    if (role === 'MECHANIC') {
      await prisma.mechanic.create({
        data: {
          userId: newUser.id,
          photoUrl,
          specialties: formData.get('specialties')
            ? (formData.get('specialties') as string).split(',')
            : [],
          experience: Number(formData.get('experience')) || 0,
          cityId,
          services, // Salvando os serviços no campo 'services' da tabela mechanic
        },
      });
    } else if (role === 'COMMISSIONAIRE') {
      await prisma.commissionaire.create({
        data: {
          userId: newUser.id,
        },
      });
    }

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    );
  }
}
