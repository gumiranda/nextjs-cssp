// app/api/users/route.ts
import {
  NextRequest,
  NextResponse,
} from 'next/server';
import { prisma } from '@/lib/prisma';

// 📖 GET - Listar usuários
export async function GET() {
  try {
    const users =
      await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

    return NextResponse.json(users);
  } catch (error) {
    console.error(
      'Erro ao buscar usuários:',
      error,
    );
    return NextResponse.json(
      {
        error:
          'Erro interno do servidor',
      },
      { status: 500 },
    );
  }
}

// ✏️ POST - Criar usuário
export async function POST(
  request: NextRequest,
) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // Validação básica
    if (!email) {
      return NextResponse.json(
        {
          error: 'Email é obrigatório',
        },
        { status: 400 },
      );
    }

    const user =
      await prisma.user.create({
        data: {
          name,
          email,
        },
      });

    return NextResponse.json(user, {
      status: 201,
    });
  } catch (error) {
    console.error(
      'Erro ao criar usuário:',
      error,
    );

    return NextResponse.json(
      {
        error:
          'Erro interno do servidor',
      },
      { status: 500 },
    );
  }
}
