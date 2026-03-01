import { z } from 'zod';
import { insertProductSchema, insertProductVariantSchema, insertCollectionSchema, insertLookbookSchema, products, productVariants, collections, lookbooks } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  products: {
    list: {
      method: 'GET' as const,
      path: '/api/products' as const,
      responses: {
        200: z.array(z.custom<typeof products.$inferSelect & { variants: typeof productVariants.$inferSelect[] }>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/products/:slug' as const,
      responses: {
        200: z.custom<typeof products.$inferSelect & { variants: typeof productVariants.$inferSelect[] }>(),
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
      path: '/api/collections/:slug' as const,
      responses: {
        200: z.custom<typeof collections.$inferSelect & { products: (typeof products.$inferSelect & { variants: typeof productVariants.$inferSelect[] })[] }>(),
        404: errorSchemas.notFound,
      },
    },
  },
  lookbooks: {
    list: {
      method: 'GET' as const,
      path: '/api/lookbooks' as const,
      responses: {
        200: z.array(z.custom<typeof lookbooks.$inferSelect>()),
      },
    },
  },
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
