import { useLookbook } from "@/hooks/use-shop";
import { Skeleton } from "@/components/ui/skeleton";

export function Lookbook() {
  const { data: lookbookItems, isLoading } = useLookbook();

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 sm:px-12 max-w-[1600px] mx-auto">
      <div className="text-center mb-20">
        <h1 className="font-display text-5xl md:text-7xl tracking-[0.15em] uppercase mb-6">
          Lookbook
        </h1>
        <p className="text-muted-foreground tracking-[0.2em] uppercase text-sm max-w-2xl mx-auto leading-relaxed">
          A visual exploration of the UONIMIQ aesthetic. Raw forms, refined execution.
        </p>
      </div>

      {isLoading ? (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className={`w-full rounded-none bg-muted/20 ${i % 2 === 0 ? 'h-[600px]' : 'h-[400px]'}`} />
          ))}
        </div>
      ) : lookbookItems?.length === 0 ? (
        <div className="py-32 text-center text-muted-foreground tracking-widest">
          Coming Soon.
        </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {lookbookItems?.map((item) => (
            <div key={item.id} className="break-inside-avoid group relative overflow-hidden bg-card border border-border/50">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="font-display text-2xl tracking-widest uppercase text-foreground">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
