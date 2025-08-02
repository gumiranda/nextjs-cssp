// Configuração do middleware Clerk + tRPC
import {
  clerkMiddleware,
  createRouteMatcher,
} from '@clerk/nextjs/server';

const isPublicRoute =
  createRouteMatcher([
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/',
    '/api/inngest(.*)',
    '/api/trpc(.*)', // 🎯 Importante: tRPC precisa ser público para auth flow
    '/api/webhooks/stripe(.*)',
    '/pricing(.*)',
  ]);

export default clerkMiddleware(
  async (auth, req) => {
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
  },
);

export const config = {
  matcher: [
    // ✅ Skip Next.js internals e arquivos estáticos
    '/((?!_next|[^?]*.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // ✅ Sempre executar para API routes
    '/(api|trpc)(.*)',
  ],
};
