export type UonimiqAssets = {
  heroVideo?: string;
};

export function isShopify(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean((window as unknown as { Shopify?: unknown }).Shopify);
}

export function getShopifyAssets(): UonimiqAssets {
  if (typeof window === "undefined") return {};
  return (
    (window as unknown as { __UONIMIQ_ASSETS__?: UonimiqAssets })
      .__UONIMIQ_ASSETS__ || {}
  );
}

export function getHeroVideoUrl(): string {
  return getShopifyAssets().heroVideo || "/videos/hero.mp4";
}
