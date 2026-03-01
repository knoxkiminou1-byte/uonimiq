import { isShopify } from "./shopify";

const shopifyPagePath = (handle: string) => `/pages/${handle}`;

export const routes = {
  home: () => "/",
  shop: () => (isShopify() ? shopifyPagePath("shop") : "/shop"),
  collections: () => "/collections",
  lookbook: () => (isShopify() ? shopifyPagePath("lookbook") : "/lookbook"),
  about: () => (isShopify() ? shopifyPagePath("about") : "/about"),
  product: (slug: string) => (isShopify() ? `/products/${slug}` : `/product/${slug}`),
  collection: (slug: string) => `/collections/${slug}`,
};
