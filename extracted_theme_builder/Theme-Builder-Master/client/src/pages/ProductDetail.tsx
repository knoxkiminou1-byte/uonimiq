import { useParams } from "wouter";
import { useProduct, formatPrice } from "@/hooks/use-shop";
import { useCart } from "@/context/CartContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft } from "lucide-react";

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id);
  const { addToCart } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 grid grid-cols-1 lg:grid-cols-2 max-w-[1600px] mx-auto">
        <Skeleton className="h-[70vh] lg:h-screen rounded-none bg-muted/20" />
        <div className="p-12 space-y-8">
          <Skeleton className="h-8 w-1/3 bg-muted/20" />
          <Skeleton className="h-16 w-3/4 bg-muted/20" />
          <Skeleton className="h-24 w-full bg-muted/20" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center flex-col gap-6">
        <h1 className="font-display text-4xl tracking-widest">Piece Not Found</h1>
        <Button onClick={() => window.history.back()} variant="outline" className="rounded-none tracking-widest uppercase">
          <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 lg:pt-0">
      <div className="flex flex-col lg:flex-row max-w-[1600px] mx-auto min-h-screen">
        
        {/* Left: Image */}
        <div className="w-full lg:w-1/2 relative bg-card lg:min-h-screen border-r border-border">
          <div className="lg:sticky lg:top-0 lg:h-screen w-full overflow-hidden flex items-center justify-center p-0 lg:p-12">
            <img 
              src={product.imageUrl} 
              alt={product.title}
              className="w-full h-[60vh] lg:h-full object-cover lg:object-contain shadow-2xl"
            />
          </div>
        </div>

        {/* Right: Info */}
        <div className="w-full lg:w-1/2 p-6 sm:p-12 lg:p-24 flex flex-col justify-center">
          <div className="max-w-xl">
            <div className="flex gap-4 mb-6">
              <span className="text-primary tracking-[0.3em] text-xs uppercase">{product.category}</span>
              {product.isNewDrop && (
                <span className="text-secondary tracking-[0.3em] text-xs uppercase border-l border-border pl-4">New Drop</span>
              )}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-widest uppercase leading-tight mb-6">
              {product.title}
            </h1>
            
            <p className="font-sans text-2xl tracking-widest text-muted-foreground mb-12">
              {formatPrice(product.price)}
            </p>

            <div className="space-y-8 mb-12">
              <Button 
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
                className="w-full h-16 rounded-none bg-foreground text-background hover:bg-primary hover:text-primary-foreground text-sm tracking-[0.2em] uppercase transition-all duration-300"
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              
              <p className="text-muted-foreground tracking-wider leading-relaxed text-sm">
                {product.description}
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full border-t border-border">
              <AccordionItem value="details" className="border-border">
                <AccordionTrigger className="hover:no-underline font-display tracking-widest uppercase text-sm py-6">
                  Details & Fit
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm tracking-wide leading-relaxed pb-6">
                  Engineered with premium materials. True to size. We recommend taking your standard size for the intended structured aesthetic. Model is 6'2" wearing size L.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping" className="border-border">
                <AccordionTrigger className="hover:no-underline font-display tracking-widest uppercase text-sm py-6">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm tracking-wide leading-relaxed pb-6">
                  Complimentary express shipping on all domestic orders. International delivery available. Returns accepted within 14 days of receipt in original condition.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
          </div>
        </div>

      </div>
    </div>
  );
}
