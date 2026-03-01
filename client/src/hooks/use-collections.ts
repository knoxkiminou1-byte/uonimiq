import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

function parseWithLogging<T>(schema: z.ZodSchema<T>, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useCollections() {
  return useQuery({
    queryKey: [api.collections.list.path],
    queryFn: async () => {
      const res = await fetch(api.collections.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch collections");
      const data = await res.json();
      return parseWithLogging(api.collections.list.responses[200], data, "collections.list");
    },
  });
}

export function useCollection(slug: string) {
  return useQuery({
    queryKey: [api.collections.get.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.collections.get.path, { slug });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch collection");
      const data = await res.json();
      return parseWithLogging(api.collections.get.responses[200], data, "collections.get");
    },
    enabled: !!slug,
  });
}
