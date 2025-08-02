// Server-side setup do tRPC
import 'server-only'; // 🔒 Garante que não vaze para client
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import { cache } from 'react';
import { createTRPCContext } from './init';
import { makeQueryClient } from './query-client';
import { appRouter } from './routers/_app';

// 🎯 IMPORTANT: Stable getter para query client
// Retorna mesmo client durante o request
export const getQueryClient = cache(
  makeQueryClient,
);

export const trpc =
  createTRPCOptionsProxy({
    ctx: createTRPCContext,
    router: appRouter,
    queryClient: getQueryClient,
  });

// 📞 Direct caller para server components
export const caller =
  appRouter.createCaller(
    createTRPCContext,
  );
