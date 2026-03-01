import { db } from "./db";
import {
  products,
  collections,
  lookbookItems,
  type ProductResponse,
  type CollectionResponse,
  type LookbookItemResponse
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProducts(): Promise<ProductResponse[]>;
  getProduct(id: number): Promise<ProductResponse | undefined>;
  getCollections(): Promise<CollectionResponse[]>;
  getCollectionByHandle(handle: string): Promise<CollectionResponse | undefined>;
  getLookbookItems(): Promise<LookbookItemResponse[]>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<ProductResponse[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<ProductResponse | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async getCollections(): Promise<CollectionResponse[]> {
    return await db.select().from(collections);
  }

  async getCollectionByHandle(handle: string): Promise<CollectionResponse | undefined> {
    const [collection] = await db.select().from(collections).where(eq(collections.handle, handle));
    return collection;
  }

  async getLookbookItems(): Promise<LookbookItemResponse[]> {
    return await db.select().from(lookbookItems);
  }
}

export const storage = new DatabaseStorage();
