import { SignOutButton } from '@clerk/nextjs';
import {
  auth,
  currentUser,
} from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

// 🛡️ Página protegida - só usuários autenticados
export default async function DashboardPage() {
  // 🔍 Verificar se usuário está autenticado
  const { userId } = await auth();

  // 🚫 Redirecionar se não autenticado
  if (!userId) {
    redirect('/sign-in');
  }

  // 👤 Buscar dados do usuário atual
  const user = await currentUser();

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">
          🎉 Bem-vindo,{' '}
          {user?.firstName}!
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">
              Informações do Perfil
            </h3>
            <p>
              <strong>Nome:</strong>{' '}
              {user?.fullName}
            </p>
            <p>
              <strong>Email:</strong>{' '}
              {
                user?.emailAddresses[0]
                  ?.emailAddress
              }
            </p>
            <p>
              <strong>ID:</strong>{' '}
              {user?.id}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              Última Atividade
            </h3>
            <p>
              <strong>
                Último login:
              </strong>{' '}
              {user?.lastSignInAt?.toString()}
            </p>
            <p>
              <strong>
                Cadastrado em:
              </strong>{' '}
              {user?.createdAt?.toString()}
            </p>
          </div>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
