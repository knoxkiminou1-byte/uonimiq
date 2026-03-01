import { Link } from "wouter";
import { useCollections } from "@/hooks/use-shop";
import { Skeleton } from "@/components/ui/skeleton";

export function Collections() {
  const { data: collections, isLoading } = useCollections();

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-12 max-w-[1600px] mx-auto">
      <h1 className="font-display text-5xl md:text-7xl tracking-[0.15em] uppercase mb-16 text-center">
        Collections
      </h1>

      {isLoading ? (
        <div className="space-y-12">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="w-full aspect-[21/9] rounded-none bg-muted/20" />
          ))}
        </div>
      ) : collections?.length === 0 ? (
        <p className="text-center text-muted-foreground tracking-widest">No collections currently active.</p>
      ) : (
        <div className="space-y-24">
          {collections?.map((collection, index) => (
            <Link key={collection.id} href={`/collections/${collection.handle}`}>
              <div className="group relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden bg-card border border-border cursor-pointer flex items-center justify-center">
                <img 
                  src={collection.imageUrl} 
                  alt={collection.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-background/20 group-hover:bg-background/40 transition-colors duration-500" />
                
                <div className="relative z-10 text-center px-4 max-w-3xl transform group-hover:-translate-y-2 transition-transform duration-700">
                  <span className="text-primary tracking-[0.4em] text-xs uppercase mb-6 block font-bold">
                    Chapter 0{index + 1}
                  </span>
                  <h2 className="font-display text-4xl md:text-6xl tracking-widest uppercase mb-6">
                    {collection.title}
                  </h2>
                  <p className="text-muted-foreground tracking-[0.2em] uppercase text-xs leading-relaxed max-w-xl mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    {collection.description}
                  </p>
                  <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                    <span className="border-b border-primary text-primary pb-1 tracking-[0.2em] text-xs uppercase">Explore</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
