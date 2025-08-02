// Configuração do React Query Client
import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from '@tanstack/react-query';
import superjson from 'superjson';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000, // 🚀 30s cache para reduzir requests
      },
      dehydrate: {
        serializeData:
          superjson.serialize, // ✅ SSR + client sync
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(
            query,
          ) ||
          query.state.status ===
            'pending',
      },
      hydrate: {
        deserializeData:
          superjson.deserialize, // ✅ Hidratação type-safe
      },
    },
  });
}
