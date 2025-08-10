'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';
import { features } from 'process';
import { useState } from 'react';

const plans = [
  {
    name: 'Básico',
    price: '$ 29,90',
    priceId: 'STRIPE_PRICE_ID_BASIC',
    description: 'Para começar',
    features: [
      'Acesso a plataforma',
      'Suporte básico',
      'Atualizações regulares',
    ],
  },
  {
    name: 'Pro',
    price: '$ 39,90',
    priceId: 'STRIPE_PRICE_ID_PRO',
    description:
      'Para usuários avançados',
    features: [
      'Acesso a plataforma',
      'Suporte básico',
      'Atualizações regulares',
    ],
    popular: true,
  },
];

export default function PricingPage() {
  const [loading, setLoading] =
    useState<string | null>(null);
  const handleSubscribe = async (
    priceId: string,
  ) => {
    setLoading(priceId);
    try {
      const response = await fetch(
        '/api/create-checkout-session',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            priceId,
          }),
        },
      );

      const data =
        await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error(
          'Erro ao criar sessão:',
          data.error,
        );
        alert(
          'Erro ao processar pagamento. Tente novamente.',
        );
      }
    } catch (error) {
      console.error(
        'Error during subscription:',
        error,
      );
      setLoading(null);
    }
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Escolha seu plano
          </h1>
          <p className="text-xl text-muted-foreground">
            Compare os recursos e
            escolha o plano que melhor
            atende às suas necessidades.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${
                plan.popular
                  ? 'border-2 border-primary shadow-lg'
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Mais popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  {plan.name}
                </CardTitle>
                <CardDescription>
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-muted-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">
                    /mês
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map(
                    (feature) => (
                      <li
                        key={feature}
                        className="flex items-center"
                      >
                        <Check className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => {
                    handleSubscribe(
                      plan.priceId,
                    );
                  }}
                  disabled={
                    loading ===
                    plan.priceId
                  }
                  className={`w-full cursor-pointer`}
                >
                  {loading ===
                  plan.priceId
                    ? 'Processando...'
                    : `Assinar ${plan.name}`}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
