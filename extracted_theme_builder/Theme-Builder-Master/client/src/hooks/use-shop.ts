import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

// --- Products ---

export function useProducts() {
  return useQuery({
    queryKey: [api.products.list.path],
    queryFn: async () => {
      const res = await fetch(api.products.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch products");
      return api.products.list.responses[200].parse(await res.json());
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: [api.products.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.products.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch product");
      return api.products.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

// --- Collections ---

export function useCollections() {
  return useQuery({
    queryKey: [api.collections.list.path],
    queryFn: async () => {
      const res = await fetch(api.collections.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch collections");
      return api.collections.list.responses[200].parse(await res.json());
    },
  });
}

export function useCollection(handle: string) {
  return useQuery({
    queryKey: [api.collections.get.path, handle],
    queryFn: async () => {
      const url = buildUrl(api.collections.get.path, { handle });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch collection");
      return api.collections.get.responses[200].parse(await res.json());
    },
    enabled: !!handle,
  });
}

// --- Lookbook ---

export function useLookbook() {
  return useQuery({
    queryKey: [api.lookbook.list.path],
    queryFn: async () => {
      const res = await fetch(api.lookbook.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch lookbook");
      return api.lookbook.list.responses[200].parse(await res.json());
    },
  });
}

// --- Utils ---
export function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}
