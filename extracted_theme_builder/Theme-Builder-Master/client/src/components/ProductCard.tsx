import { Link } from "wouter";
import { formatPrice } from "@/hooks/use-shop";
import { type ProductResponse } from "@shared/schema";

export function ProductCard({ product }: { product: ProductResponse }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="group cursor-pointer flex flex-col h-full bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden relative">
        
        {/* Status Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.isNewDrop && (
            <span className="bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.2em] px-3 py-1 font-bold">
              New Drop
            </span>
          )}
          {!product.inStock && (
            <span className="bg-destructive text-destructive-foreground text-[10px] uppercase tracking-[0.2em] px-3 py-1 font-bold">
              Out of Stock
            </span>
          )}
        </div>

        {/* Image Container */}
        <div className="aspect-[3/4] overflow-hidden bg-muted relative">
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-80 transition-all duration-700 ease-in-out"
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1 bg-gradient-to-b from-transparent to-background/50">
          <p className="text-[10px] tracking-[0.25em] text-primary uppercase mb-2">
            {product.category}
          </p>
          <h3 className="font-display text-lg tracking-wider mb-4 leading-tight group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          <div className="mt-auto flex items-end justify-between">
            <p className="font-sans text-sm tracking-widest">
              {formatPrice(product.price)}
            </p>
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground transition-colors border-b border-transparent group-hover:border-foreground pb-0.5">
              View
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
