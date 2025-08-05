// app/api/posts/route.ts
// app/api/posts/route.ts
import {
  NextRequest,
  NextResponse,
} from 'next/server';
import { prisma } from '@/lib/prisma';

// 📖 GET - Listar posts
export async function GET() {
  try {
    const posts =
      await prisma.post.findMany({
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

    return NextResponse.json(posts);
  } catch (error) {
    console.error(
      'Erro ao buscar posts:',
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

// ✏️ POST - Criar post
export async function POST(
  request: NextRequest,
) {
  try {
    const body = await request.json();
    const {
      title,
      content,
      authorId,
      published = false,
    } = body;

    if (!title || !authorId) {
      return NextResponse.json(
        {
          error:
            'Título e autor são obrigatórios',
        },
        { status: 400 },
      );
    }

    // Gerar slug único
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const post =
      await prisma.post.create({
        data: {
          title,
          content,
          slug: `${slug}-${Date.now()}`,
          published,
          authorId,
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

    return NextResponse.json(post, {
      status: 201,
    });
  } catch (error) {
    console.error(
      'Erro ao criar post:',
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
