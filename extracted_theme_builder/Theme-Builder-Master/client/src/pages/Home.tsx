import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import heroVideo from '@assets/c904sh0rr1rmy0cwn25trz20mr_result__1772355237460.mp4';
import { useProducts, useCollections } from "@/hooks/use-shop";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export function Home() {
  const { data: products, isLoading: isLoadingProducts } = useProducts();
  const { data: collections, isLoading: isLoadingCollections } = useCollections();

  const featuredDrop = products?.filter(p => p.isNewDrop).slice(0, 4);
  const signaturePieces = products?.filter(p => p.isFeatured).slice(0, 3);

  return (
    <div className="w-full bg-black">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover scale-105 opacity-60 mix-blend-lighten shadow-[0_0_100px_rgba(0,0,0,1)_inset]"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        
        {/* Deep Obsidian 3D Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-10" />

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 pt-20">
          <span className="text-primary tracking-[0.4em] uppercase text-xs sm:text-sm mb-6 animate-pulse">
            The New Standard
          </span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-9xl text-foreground uppercase tracking-[0.15em] mb-8 drop-shadow-2xl">
            Uonimiq
          </h1>
          <p className="text-muted-foreground/80 tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm mb-12 max-w-xl leading-loose">
            Obsidian aesthetics fused with modern elegance. Curated for the few.
          </p>
          <Link href="/shop" className="group flex items-center gap-4 border border-primary/50 bg-background/20 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-500 px-8 py-5 tracking-[0.25em] uppercase text-xs">
            Enter Collection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Featured Drop Section */}
      <section className="py-32 px-6 sm:px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-border pb-8">
          <div>
            <span className="text-primary tracking-[0.3em] text-xs uppercase mb-2 block">Phase 01</span>
            <h2 className="font-display text-4xl sm:text-5xl tracking-widest uppercase">New Drop</h2>
          </div>
          <Link href="/shop?filter=new" className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
            View All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {isLoadingProducts ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="aspect-[3/4] rounded-none bg-muted/20" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDrop?.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Brand Manifesto */}
      <section className="relative py-40 overflow-hidden bg-card border-y border-border">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {/* Abstract background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[150px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl tracking-[0.1em] leading-tight mb-12">
            "WE DO NOT FOLLOW TRENDS.<br/> <span className="text-primary italic">WE SHADOW THEM.</span>"
          </h2>
          <p className="text-muted-foreground tracking-widest uppercase text-sm leading-loose max-w-2xl mx-auto">
            Born from the juxtaposition of raw brutalism and refined luxury. 
            UONIMIQ stands at the intersection of stark minimalism and rich materiality. 
            Every stitch is an intention. Every silhouette, a statement.
          </p>
        </div>
      </section>

      {/* Collections Gateways */}
      <section className="py-32 px-6 sm:px-12 max-w-[1600px] mx-auto">
        <h2 className="font-display text-4xl sm:text-5xl tracking-widest uppercase text-center mb-24">
          Curated Worlds
        </h2>
        
        {isLoadingCollections ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="aspect-[16/9] md:aspect-[4/3] rounded-none bg-muted/20" />
            <Skeleton className="aspect-[16/9] md:aspect-[4/3] rounded-none bg-muted/20" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections?.slice(0, 2).map((collection) => (
              <Link key={collection.id} href={`/collections/${collection.handle}`}>
                <div className="group relative aspect-[16/9] md:aspect-[4/3] overflow-hidden cursor-pointer bg-muted border border-border">
                  <img 
                    src={collection.imageUrl} 
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute inset-0 p-12 flex flex-col justify-end">
                    <span className="text-primary tracking-[0.3em] text-xs uppercase mb-4 block transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      Explore Collection
                    </span>
                    <h3 className="font-display text-4xl sm:text-5xl tracking-widest uppercase group-hover:text-primary transition-colors duration-500">
                      {collection.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
