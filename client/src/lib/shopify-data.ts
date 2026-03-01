import type {
  Collection,
  Lookbook,
  ProductResponse,
  ProductVariant,
} from "@shared/schema";
import { isShopify } from "./shopify";

type ShopifyImage = {
  src?: string;
  url?: string;
};

type ShopifyVariant = {
  id: number | string;
  title?: string;
  sku?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  available?: boolean;
  inventory_quantity?: number;
  price?: string;
  compare_at_price?: string | null;
};

type ShopifyOption = {
  name?: string;
  position?: number;
};

type ShopifyProduct = {
  id: number | string;
  title: string;
  handle: string;
  description?: string;
  product_type?: string;
  tags?: string[];
  images?: ShopifyImage[];
  variants?: ShopifyVariant[];
  options?: ShopifyOption[];
};

type ShopifyCollection = {
  id: number | string;
  title: string;
  handle: string;
  description?: string;
  image?: ShopifyImage | null;
  products?: ShopifyProduct[];
};

type ShopifyLookbook = {
  title: string;
  description?: string;
  image?: string;
  featuredProductHandles?: string[];
};

type ShopifyWindowData = {
  products?: ShopifyProduct[];
  product?: ShopifyProduct | null;
  collections?: ShopifyCollection[];
  collection?: ShopifyCollection | null;
  lookbooks?: ShopifyLookbook[];
};

const fallbackProducts: ProductResponse[] = [
  {
    id: 1,
    title: "Crown Obsidian Hoodie",
    slug: "crown-obsidian-hoodie",
    description:
      "A heavy-weight luxury hoodie featuring the signature crowned lion crest. Designed with an oversized drop-shoulder fit.",
    price: "195.00",
    compareAtPrice: null,
    isNew: false,
    isSignature: true,
    isLimited: false,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2",
    ],
    category: "Hoodies",
    fitNotes: "Oversized fit. Size down for a standard fit.",
    materialAndCare: "100% Heavyweight French Terry Cotton. Dry clean only.",
    variants: [
      { id: 1, productId: 1, size: "S", color: "Obsidian", sku: "COH-S", stock: 10 },
      { id: 2, productId: 1, size: "M", color: "Obsidian", sku: "COH-M", stock: 15 },
      { id: 3, productId: 1, size: "L", color: "Obsidian", sku: "COH-L", stock: 20 },
    ],
  },
  {
    id: 2,
    title: "Ember Glow Tee",
    slug: "ember-glow-tee",
    description: "A washed charcoal tee with subtle amber accents and a vintage drape.",
    price: "85.00",
    compareAtPrice: null,
    isNew: true,
    isSignature: false,
    isLimited: false,
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"],
    category: "Tees",
    fitNotes: "Boxy fit.",
    materialAndCare: "100% Cotton. Machine wash cold, lay flat to dry.",
    variants: [
      { id: 4, productId: 2, size: "S", color: "Charcoal", sku: "EGT-S", stock: 5 },
      { id: 5, productId: 2, size: "M", color: "Charcoal", sku: "EGT-M", stock: 8 },
    ],
  },
  {
    id: 3,
    title: "Storm Violet Trench",
    slug: "storm-violet-trench",
    description:
      "An imposing, weather-resistant trench coat. Black outer shell with electric violet lining.",
    price: "450.00",
    compareAtPrice: null,
    isNew: false,
    isSignature: false,
    isLimited: true,
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5"],
    category: "Outerwear",
    fitNotes: "True to size. Tailored for layering.",
    materialAndCare: "Water-resistant gabardine. Dry clean only.",
    variants: [
      { id: 6, productId: 3, size: "M", color: "Black/Violet", sku: "SVT-M", stock: 3 },
      { id: 7, productId: 3, size: "L", color: "Black/Violet", sku: "SVT-L", stock: 2 },
    ],
  },
];

const fallbackCollections: Collection[] = [
  {
    id: 1,
    title: "Obsidian Core",
    slug: "obsidian-core",
    description: "The foundational pieces of the house. Cut from darkness.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853",
    theme: "default",
  },
  {
    id: 2,
    title: "Storm Line",
    slug: "storm-line",
    description: "Embrace the elements. Outerwear and resilience.",
    image: "https://images.unsplash.com/photo-1549439602-43ebca2327af",
    theme: "ceremonial",
  },
];

const fallbackLookbooks: Lookbook[] = [
  {
    id: 1,
    title: "Campaign 01: The Storm Gathers",
    description:
      "An introduction to the house. Shot on location in the obsidian desert under violet skies.",
    image: "https://images.unsplash.com/photo-1507676184212-d0c30a51fb3e",
    featuredProductIds: [1, 3],
  },
];

function getShopifyWindowData(): ShopifyWindowData | null {
  if (typeof window === "undefined") return null;
  return (
    (window as unknown as { __UONIMIQ_DATA__?: ShopifyWindowData })
      .__UONIMIQ_DATA__ || null
  );
}

function normalizeTag(tag?: string) {
  return (tag || "").toLowerCase().replace(/\s+/g, "-");
}

function pickProductFlags(tags: string[] = []) {
  const normalized = tags.map(normalizeTag);
  return {
    isNew: normalized.includes("new") || normalized.includes("new-drop"),
    isSignature: normalized.includes("signature") || normalized.includes("hero"),
    isLimited: normalized.includes("limited") || normalized.includes("limited-run"),
  };
}

function resolveVariantOption(
  variant: ShopifyVariant,
  optionIndex: number,
  fallback: string
) {
  if (optionIndex === 0) return variant.option1 || fallback;
  if (optionIndex === 1) return variant.option2 || fallback;
  if (optionIndex === 2) return variant.option3 || fallback;
  return fallback;
}

function mapShopifyProduct(product: ShopifyProduct): ProductResponse {
  const tags = product.tags || [];
  const optionNames = (product.options || []).map((option) =>
    normalizeTag(option.name)
  );
  const sizeIndex = optionNames.findIndex((name) => name.includes("size"));
  const colorIndex = optionNames.findIndex((name) => name.includes("color"));

  const variants: ProductVariant[] = (product.variants || []).map((variant, idx) => {
    const size = resolveVariantOption(
      variant,
      sizeIndex >= 0 ? sizeIndex : 0,
      "One Size"
    );
    const color = resolveVariantOption(
      variant,
      colorIndex >= 0 ? colorIndex : 1,
      "Black"
    );
    return {
      id: Number(variant.id) || idx + 1,
      productId: Number(product.id) || 0,
      size,
      color,
      sku: variant.sku || `${product.handle}-${idx + 1}`,
      stock:
        typeof variant.inventory_quantity === "number"
          ? variant.inventory_quantity
          : variant.available
          ? 1
          : 0,
    };
  });

  const primaryVariant = product.variants?.[0];
  const price = primaryVariant?.price || "0.00";
  const compareAtPrice = primaryVariant?.compare_at_price || null;
  const images =
    product.images?.map((img) => img.src || img.url).filter(Boolean) || [];

  return {
    id: Number(product.id) || 0,
    title: product.title,
    slug: product.handle,
    description: product.description || "",
    price,
    compareAtPrice,
    images,
    category: product.product_type || "Apparel",
    ...pickProductFlags(tags),
    fitNotes: null,
    materialAndCare: null,
    variants,
  };
}

function mapShopifyCollection(
  collection: ShopifyCollection,
  products: ProductResponse[]
): Collection & { products?: ProductResponse[] } {
  return {
    id: Number(collection.id) || 0,
    title: collection.title,
    slug: collection.handle,
    description: collection.description || "",
    image: collection.image?.src || collection.image?.url || "",
    theme: "default",
    products,
  };
}

export type UonimiqData = {
  products: ProductResponse[];
  collections: (Collection & { products?: ProductResponse[] })[];
  lookbooks: Lookbook[];
  productBySlug: (slug: string) => ProductResponse | null;
  collectionBySlug: (slug: string) => (Collection & { products?: ProductResponse[] }) | null;
};

export function getUonimiqData(): UonimiqData {
  const shopifyData = getShopifyWindowData();
  const isShopifyEnv = isShopify();

  if (isShopifyEnv && shopifyData) {
    const productPool: ProductResponse[] = [
      ...(shopifyData.products || []).map(mapShopifyProduct),
    ];

    if (shopifyData.product) {
      const mapped = mapShopifyProduct(shopifyData.product);
      if (!productPool.find((p) => p.slug === mapped.slug)) {
        productPool.push(mapped);
      }
    }

    const collections: (Collection & { products?: ProductResponse[] })[] = (
      shopifyData.collections || []
    ).map((collection) =>
      mapShopifyCollection(
        collection,
        (collection.products || []).map(mapShopifyProduct)
      )
    );

    if (shopifyData.collection) {
      const mapped = mapShopifyCollection(
        shopifyData.collection,
        (shopifyData.collection.products || []).map(mapShopifyProduct)
      );
      if (!collections.find((c) => c.slug === mapped.slug)) {
        collections.push(mapped);
      }
    }

    const lookbooks: Lookbook[] =
      shopifyData.lookbooks?.map((lookbook, idx) => ({
        id: idx + 1,
        title: lookbook.title,
        description: lookbook.description || "",
        image: lookbook.image || "",
        featuredProductIds: [],
      })) || [];

    return {
      products: productPool.length ? productPool : fallbackProducts,
      collections: collections.length
        ? collections
        : fallbackCollections.map((collection) => ({
            ...collection,
            products: productPool,
          })),
      lookbooks: lookbooks.length ? lookbooks : fallbackLookbooks,
      productBySlug: (slug) =>
        productPool.find((product) => product.slug === slug) || null,
      collectionBySlug: (slug) =>
        collections.find((collection) => collection.slug === slug) || null,
    };
  }

  return {
    products: fallbackProducts,
    collections: fallbackCollections.map((collection) => ({
      ...collection,
      products: fallbackProducts,
    })),
    lookbooks: fallbackLookbooks,
    productBySlug: (slug) =>
      fallbackProducts.find((product) => product.slug === slug) || null,
    collectionBySlug: (slug) =>
      fallbackCollections.find((collection) => collection.slug === slug) || null,
  };
}
