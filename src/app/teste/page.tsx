// app/teste/page.tsx
// components/PrismaTest.tsx
'use client';

import {
  useState,
  useEffect,
} from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface User {
  id: string;
  name: string | null;
  email: string;
  createdAt: string;
}

export default function PrismaTest() {
  const [users, setUsers] = useState<
    User[]
  >([]);
  const [loading, setLoading] =
    useState(false);
  const [newUser, setNewUser] =
    useState({ name: '', email: '' });

  // 📖 Buscar usuários
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        '/api/users',
      );
      const data =
        await response.json();
      setUsers(data);
    } catch (error) {
      console.error(
        'Erro ao buscar usuários:',
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  // ✏️ Criar usuário
  const createUser = async () => {
    if (!newUser.email) return;

    try {
      const response = await fetch(
        '/api/users',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify(newUser),
        },
      );

      if (response.ok) {
        setNewUser({
          name: '',
          email: '',
        });
        fetchUsers(); // Recarregar lista
      }
    } catch (error) {
      console.error(
        'Erro ao criar usuário:',
        error,
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            🧪 Teste do Prisma + Neon
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Nome"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  name: e.target.value,
                })
              }
            />
            <Input
              placeholder="Email"
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  email: e.target.value,
                })
              }
            />
            <Button
              onClick={createUser}
            >
              Criar
            </Button>
          </div>

          <Button
            onClick={fetchUsers}
            disabled={loading}
          >
            {loading
              ? 'Carregando...'
              : 'Recarregar'}
          </Button>

          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-3 border rounded"
              >
                <p>
                  <strong>
                    {user.name ||
                      'Sem nome'}
                  </strong>
                </p>
                <p className="text-sm text-gray-600">
                  {user.email}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
