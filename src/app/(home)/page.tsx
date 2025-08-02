import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-50 to-background-100">
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6 text-muted-foreground bg-clip-text">
          O SaaS mais simples do mundo
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Uma plataforma SaaS que te
          ajuda a criar e gerenciar seus
          projetos de forma simples e
          eficiente.
        </p>
        <Link href="/pricing">
          <Button>Comece agora</Button>
        </Link>
      </section>
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>
                Simples
              </CardTitle>
              <CardDescription>
                Nossa plataforma é fácil
                de usar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs">
                Sem complicações, sem
                configurações
                desnecessárias. Tudo que
                você precisa em um
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>
                Seguro
              </CardTitle>
              <CardDescription>
                Pagamentos via Stripe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs">
                Integração completa com
                Stripe para pagamentos
                seguros.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                Rápido
              </CardTitle>
              <CardDescription>
                Setup em minutos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-xs">
                Comece a usar em poucos
                cliques, sem
                configurações complexas.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
