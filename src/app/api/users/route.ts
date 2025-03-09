import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

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
    const body = await req.json();
    const {
      name,
      phone,
      whatsapp,
      address,
      email,
      password_hash,
      cityId,
      commissionaireId,
      photoUrl,
      isAdmin,
      paymentStatus,
      services,
    } = body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 },
      );
    }

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
        commissionaireId: commissionaireExists ? commissionaireId : null,
        photoUrl: photoUrl || null,
        isAdmin,
        paymentStatus,
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
