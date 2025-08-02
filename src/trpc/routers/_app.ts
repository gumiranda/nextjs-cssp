// Router principal do tRPC
import { createTRPCRouter } from '../init';
//import { messagesRouter } from '@/modules/messages/server/procedures';
//import { projectsRouter } from '@/modules/projects/server/procedures';
//import { usagesRouter } from '@/modules/usage/server/procedures';

export const appRouter =
  createTRPCRouter({
    //messages: messagesRouter,
    //projects: projectsRouter,
    //usages: usagesRouter,
  });

// 🎯 Export type definition para client type-safety
export type AppRouter =
  typeof appRouter;
