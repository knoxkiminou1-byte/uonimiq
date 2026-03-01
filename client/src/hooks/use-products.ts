import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { getUonimiqData } from "@/lib/shopify-data";
import { isShopify } from "@/lib/shopify";
import { z } from "zod";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useProducts() {
  return useQuery({
    queryKey: [api.products.list.path],
    queryFn: async () => {
      if (isShopify()) {
        return getUonimiqData().products;
      }
      const res = await fetch(api.products.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      return parseWithLogging(api.products.list.responses[200], data, "products.list");
    },
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: [api.products.get.path, slug],
    queryFn: async () => {
      if (isShopify()) {
        return getUonimiqData().productBySlug(slug);
      }
      const url = buildUrl(api.products.get.path, { slug });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch product");
      const data = await res.json();
      return parseWithLogging(api.products.get.responses[200], data, "products.get");
    },
    enabled: !!slug,
  });
}
