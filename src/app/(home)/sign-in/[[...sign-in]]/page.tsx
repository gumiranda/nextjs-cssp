import { SignIn } from '@clerk/nextjs';

// 🔑 Página de login usando componente do Clerk
export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary:
              'bg-blue-600 hover:bg-blue-700',
            card: 'shadow-xl',
          },
        }}
      />
    </div>
  );
}
