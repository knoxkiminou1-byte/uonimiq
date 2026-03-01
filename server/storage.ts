import { db } from "./db";
import {
  products,
  productVariants,
  collections,
  lookbooks,
  collectionProducts,
  type Product,
  type ProductVariant,
  type Collection,
  type Lookbook
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProducts(): Promise<(Product & { variants: ProductVariant[] })[]>;
  getProductBySlug(slug: string): Promise<(Product & { variants: ProductVariant[] }) | undefined>;
  getCollections(): Promise<Collection[]>;
  getCollectionBySlug(slug: string): Promise<(Collection & { products: (Product & { variants: ProductVariant[] })[] }) | undefined>;
  getLookbooks(): Promise<Lookbook[]>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<(Product & { variants: ProductVariant[] })[]> {
    const allProducts = await db.select().from(products);
    const allVariants = await db.select().from(productVariants);

    return allProducts.map(product => ({
      ...product,
      variants: allVariants.filter(v => v.productId === product.id)
    }));
  }

  async getProductBySlug(slug: string): Promise<(Product & { variants: ProductVariant[] }) | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    if (!product) return undefined;

    const variants = await db.select().from(productVariants).where(eq(productVariants.productId, product.id));
    return { ...product, variants };
  }

  async getCollections(): Promise<Collection[]> {
    return await db.select().from(collections);
  }

  async getCollectionBySlug(slug: string): Promise<(Collection & { products: (Product & { variants: ProductVariant[] })[] }) | undefined> {
    const [collection] = await db.select().from(collections).where(eq(collections.slug, slug));
    if (!collection) return undefined;

    const collProducts = await db.select()
      .from(collectionProducts)
      .where(eq(collectionProducts.collectionId, collection.id));
    
    if (collProducts.length === 0) {
      return { ...collection, products: [] };
    }

    const productIds = collProducts.map(cp => cp.productId);
    
    // We fetch all products and variants and filter. Not the most optimal SQL query but works for the MVP scale.
    const allProducts = await db.select().from(products);
    const allVariants = await db.select().from(productVariants);

    const relatedProducts = allProducts
      .filter(p => productIds.includes(p.id))
      .map(product => ({
        ...product,
        variants: allVariants.filter(v => v.productId === product.id)
      }));

    return { ...collection, products: relatedProducts };
  }

  async getLookbooks(): Promise<Lookbook[]> {
    return await db.select().from(lookbooks);
  }
}

export const storage = new DatabaseStorage();
