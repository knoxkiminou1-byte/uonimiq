import React, { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { useProduct, useProducts } from '@/hooks/use-products';
import { useCart } from '@/store/use-cart';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/product-card';

export default function ProductDetail() {
  const [, paramsLegacy] = useRoute('/product/:slug');
  const [, paramsShopify] = useRoute('/products/:slug');
  const slug = paramsLegacy?.slug || paramsShopify?.slug || '';
  
  const { data: product, isLoading } = useProduct(slug);
  const { data: allProducts } = useProducts();
  const { addItem, toggleCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [activeImage, setActiveImage] = useState<number>(0);

  // Auto-select first available variants when product loads
  useEffect(() => {
    if (product?.variants && product.variants.length > 0) {
      setSelectedSize(product.variants[0].size);
      setSelectedColor(product.variants[0].color);
    }
  }, [product]);

  if (isLoading) {
    return <div className="min-h-screen pt-32 px-6 text-center text-muted-foreground animate-pulse">Summoning piece...</div>;
  }

  if (!product) {
    return <div className="min-h-screen pt-32 px-6 text-center font-serif text-2xl">Piece not found in the archives.</div>;
  }

  const sizes = Array.from(new Set(product.variants.map(v => v.size)));
  const colors = Array.from(new Set(product.variants.map(v => v.color)));
  
  const selectedVariant = product.variants.find(
    v => v.size === selectedSize && v.color === selectedColor
  ) || product.variants[0];

  const handleAddToCart = () => {
    if (selectedVariant) {
      addItem(product, selectedVariant);
    }
  };

  const relatedProducts = allProducts
    ?.filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Media Gallery */}
        <div className="flex flex-col gap-4 sticky top-32">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[3/4] bg-secondary/30 overflow-hidden relative cursor-crosshair"
          >
            <img 
              src={product.images[activeImage] || "https://images.unsplash.com/photo-1550614000-4b95d4662130?w=800&q=80"} 
              alt={product.title}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000 ease-out"
            />
          </motion.div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-20 h-28 flex-shrink-0 bg-secondary/30 border-2 transition-colors ${activeImage === idx ? 'border-primary' : 'border-transparent hover:border-white/20'}`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col pt-8 md:pt-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs tracking-[0.2em] uppercase text-primary mb-4">{product.category}</p>
            <h1 className="font-serif text-4xl lg:text-5xl mb-4">{product.title}</h1>
            <p className="text-2xl font-serif text-accent mb-8">
              ${parseFloat(product.price as unknown as string).toFixed(2)}
            </p>

            <div className="space-y-8 mb-12">
              {/* Color Selector */}
              {colors.length > 0 && (
                <div>
                  <div className="flex justify-between text-sm uppercase tracking-widest mb-3">
                    <span className="text-muted-foreground">Color</span>
                    <span>{selectedColor}</span>
                  </div>
                  <div className="flex gap-3">
                    {colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border text-sm transition-all ${
                          selectedColor === color 
                            ? 'border-primary bg-primary/10 text-primary-foreground' 
                            : 'border-border hover:border-white/30 text-muted-foreground'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {sizes.length > 0 && (
                <div>
                  <div className="flex justify-between text-sm uppercase tracking-widest mb-3">
                    <span className="text-muted-foreground">Size</span>
                    <button className="underline underline-offset-4 hover:text-primary transition-colors">Fit Guide</button>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {sizes.map(size => {
                      const isAvailable = product.variants.some(v => v.size === size && v.color === selectedColor && v.stock > 0);
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          disabled={!isAvailable}
                          className={`py-3 border text-sm transition-all ${
                            selectedSize === size 
                              ? 'border-white bg-white text-black' 
                              : !isAvailable
                                ? 'border-border opacity-30 cursor-not-allowed line-through'
                                : 'border-border hover:border-white/50 text-foreground'
                          }`}
                        >
                          {size}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={handleAddToCart}
              disabled={!selectedVariant || selectedVariant.stock === 0}
              className={`w-full py-5 text-sm tracking-[0.2em] uppercase transition-all duration-300 ${
                !selectedVariant || selectedVariant.stock === 0
                  ? 'bg-border text-muted-foreground cursor-not-allowed'
                  : 'bg-primary text-white hover:shadow-[0_0_20px_rgba(122,60,255,0.4)] hover:bg-primary/90'
              }`}
            >
              {!selectedVariant || selectedVariant.stock === 0 ? 'Out of Stock' : 'Add to Rite (Cart)'}
            </button>

            {/* Storytelling Modules */}
            <div className="mt-16 space-y-10 border-t border-border pt-12">
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">The Intent</h3>
                <p className="font-serif text-lg leading-relaxed text-foreground/90">{product.description}</p>
              </div>
              
              {product.fitNotes && (
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">The Cut</h3>
                  <p className="text-sm leading-relaxed text-foreground/80">{product.fitNotes}</p>
                </div>
              )}
              
              {product.materialAndCare && (
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">The Form & Care</h3>
                  <p className="text-sm leading-relaxed text-foreground/80">{product.materialAndCare}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-32 border-t border-border pt-24">
          <h2 className="font-serif text-3xl mb-12 text-center">Complete the Silhouette</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(rp => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
