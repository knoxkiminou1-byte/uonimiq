import { z } from 'zod';
import { products, collections, lookbookItems } from './schema';

export const errorSchemas = {
  notFound: z.object({ message: z.string() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  products: {
    list: {
      method: 'GET' as const,
      path: '/api/products' as const,
      responses: {
        200: z.array(z.custom<typeof products.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/products/:id' as const,
      responses: {
        200: z.custom<typeof products.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  collections: {
    list: {
      method: 'GET' as const,
      path: '/api/collections' as const,
      responses: {
        200: z.array(z.custom<typeof collections.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/collections/:handle' as const,
      responses: {
        200: z.custom<typeof collections.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  lookbook: {
    list: {
      method: 'GET' as const,
      path: '/api/lookbook' as const,
      responses: {
        200: z.array(z.custom<typeof lookbookItems.$inferSelect>()),
      },
    },
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type ProductListResponse = z.infer<typeof api.products.list.responses[200]>;
export type CollectionListResponse = z.infer<typeof api.collections.list.responses[200]>;
export type LookbookListResponse = z.infer<typeof api.lookbook.list.responses[200]>;
