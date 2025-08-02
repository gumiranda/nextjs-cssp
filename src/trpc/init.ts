// Context e inicialização do tRPC
import {
  initTRPC,
  TRPCError,
} from '@trpc/server';
import { cache } from 'react';
import superjson from 'superjson';
import { auth } from '@clerk/nextjs/server';

// 🎯 Context factory - chamado a cada request
export const createTRPCContext = cache(
  async () => {
    /**
     * @see: https://trpc.io/docs/server/context
     */
    return { auth: await auth() };
  },
);

export type TRPCContext = Awaited<
  ReturnType<typeof createTRPCContext>
>;

// 🏗️ Inicializar tRPC com context tipado
const t = initTRPC
  .context<TRPCContext>()
  .create({
    /**
     * @see https://trpc.io/docs/server/data-transformers
     */
    transformer: superjson, // ✅ Serializa Date, Map, Set automaticamente
  });

// 🔐 Middleware de autenticação reutilizável
const isAuthenticated = t.middleware(
  async ({ ctx, next }) => {
    if (!ctx.auth.userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Not authenticated',
      });
    }
    return next({
      ctx: {
        auth: ctx.auth, // ✅ Context tipado com user session
      },
    });
  },
);

// 📡 Base router e procedure helpers
export const createTRPCRouter =
  t.router;
export const createCallerFactory =
  t.createCallerFactory;
export const baseProcedure =
  t.procedure;
export const protectedProcedure =
  t.procedure.use(isAuthenticated);
