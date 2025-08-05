import Link from 'next/link';
 import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meu Blog',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <> 
        <header className="bg-gray-800 text-white p-4">
          <h1>Meu Blog</h1>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/sobre">Sobre</Link>
          </nav>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          © 2024 Meu Blog
        </footer> 
    </>
  );
}