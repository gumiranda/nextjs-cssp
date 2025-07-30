// Server Component - busca dados no servidor
 import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meu Post',
  description: 'Blog criado com Next.js App Router',
  keywords: ['blog', 'nextjs', 'app router','como fazer um blog', 'tutorial'],
    openGraph: {
        title: 'Meu Blog',
        description: 'Blog criado com Next.js App Router',
        url: 'https://meublog.com',
        siteName: 'Meu Blog',
        images: [
        {
            url: 'https://meublog.com/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Imagem do Meu Blog',
        },
        ],
        locale: 'pt-BR',
        type: 'website',
    },
};
export default async function HomePage() {
  // ✅ Fetch direto no Server Component
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
    next: { revalidate: 3600 } // Cache por 1 hora
  }).then(res => res.json()); 

  return (
    <div>
      <h1>Bem-vindo ao Meu Blog</h1>
      <p>Últimos posts:</p>
      
      <div className="grid gap-4">
        {posts.map((post: any) => (
          <article key={post.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-600">{post.body.slice(0, 100)}...</p>
            <a href={`/blog/${post.id}`} className="text-blue-500">
              Ler mais →
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}