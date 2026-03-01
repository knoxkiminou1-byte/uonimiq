import { useProducts } from "@/hooks/use-shop";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export function Shop() {
  const { data: products, isLoading } = useProducts();

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-12 max-w-[1600px] mx-auto">
      <div className="mb-16 pb-8 border-b border-border text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="font-display text-5xl md:text-7xl tracking-[0.15em] uppercase mb-4">
            Archive
          </h1>
          <p className="text-muted-foreground tracking-[0.2em] uppercase text-sm">
            All definitive pieces from current and past drops.
          </p>
        </div>
        <div className="text-xs tracking-widest uppercase text-muted-foreground flex gap-6">
          <button className="hover:text-primary transition-colors pb-1 border-b border-primary text-primary">All</button>
          <button className="hover:text-primary transition-colors pb-1 border-b border-transparent">Outerwear</button>
          <button className="hover:text-primary transition-colors pb-1 border-b border-transparent">Essentials</button>
          <button className="hover:text-primary transition-colors pb-1 border-b border-transparent">Accessories</button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton key={i} className="aspect-[3/4] rounded-none bg-muted/20" />
          ))}
        </div>
      ) : products?.length === 0 ? (
        <div className="py-32 text-center">
          <p className="font-display text-2xl text-muted-foreground tracking-widest">No pieces found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
