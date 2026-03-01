import React from 'react';
import { Link } from 'wouter';
import { ProductResponse } from '@shared/schema';
import { routes } from "@/lib/routes";

interface ProductCardProps {
  product: ProductResponse;
}

export function ProductCard({ product }: ProductCardProps) {
  // Use first image as main, second as hover (if exists)
  const mainImage = product.images[0] || "https://images.unsplash.com/photo-1611042553365-9b101441c135?w=600&q=80";
  const hoverImage = product.images[1] || mainImage;

  return (
    <Link href={routes.product(product.slug)} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary/30 mb-4">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="text-[10px] tracking-[0.2em] uppercase bg-primary text-white px-2 py-1">New Drop</span>
          )}
          {product.isSignature && (
            <span className="text-[10px] tracking-[0.2em] uppercase bg-accent text-background px-2 py-1">Signature</span>
          )}
        </div>
        
        {/* Images with crossfade hover effect */}
        {/* dark fashion placeholder */}
        <img 
          src={mainImage} 
          alt={product.title} 
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
        />
        <img 
          src={hoverImage} 
          alt={`${product.title} alternate view`} 
          className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out opacity-0 group-hover:opacity-100 group-hover:scale-105"
        />
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-serif text-lg group-hover:text-primary transition-colors">{product.title}</h3>
          <p className="text-xs text-muted-foreground mt-1 capitalize tracking-wider">{product.category}</p>
        </div>
        <div className="text-right">
          <p className="text-sm">${parseFloat(product.price as unknown as string).toFixed(2)}</p>
          {product.compareAtPrice && (
            <p className="text-xs text-muted-foreground line-through">
              ${parseFloat(product.compareAtPrice as unknown as string).toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
