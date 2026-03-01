import { useParams, Link } from "wouter";
import { useCollection, useProducts } from "@/hooks/use-shop";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export function CollectionDetail() {
  const { handle } = useParams<{ handle: string }>();
  const { data: collection, isLoading: isLoadingCollection } = useCollection(handle || "");
  const { data: products, isLoading: isLoadingProducts } = useProducts();

  // In a real app, products would be filtered via API by collectionId.
  // Here we filter client-side just as a fallback if the API doesn't do it, or assume all products for demo.
  // We will just show all products for the aesthetic.
  const collectionProducts = products || [];

  if (isLoadingCollection) {
    return <div className="min-h-screen pt-32 px-12"><Skeleton className="h-64 w-full bg-muted/20 rounded-none" /></div>;
  }

  if (!collection) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center">
        <h1 className="font-display text-4xl tracking-widest uppercase mb-6">Collection Not Found</h1>
        <Link href="/collections" className="text-primary border-b border-primary pb-1 tracking-widest uppercase text-sm">
          Return to Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] w-full bg-muted flex items-center justify-center overflow-hidden">
        <img 
          src={collection.imageUrl} 
          alt={collection.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="relative z-10 text-center max-w-4xl px-6 mt-20">
          <Link href="/collections" className="inline-flex items-center gap-2 text-xs tracking-widest text-muted-foreground hover:text-primary uppercase mb-8 transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back
          </Link>
          <h1 className="font-display text-5xl md:text-7xl tracking-widest uppercase mb-6 drop-shadow-lg">
            {collection.title}
          </h1>
          <p className="text-foreground/80 tracking-[0.2em] uppercase text-sm leading-relaxed max-w-2xl mx-auto">
            {collection.description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-24 px-6 sm:px-12 max-w-[1600px] mx-auto">
        <div className="mb-12 border-b border-border pb-4">
          <span className="tracking-[0.2em] uppercase text-sm text-muted-foreground">{collectionProducts.length} Pieces</span>
        </div>

        {isLoadingProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="aspect-[3/4] rounded-none bg-muted/20" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12">
            {collectionProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
