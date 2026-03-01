import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/store/use-cart';

export function CartDrawer() {
  const { isOpen, toggleCart, items, updateQuantity, removeItem } = useCart();

  const total = items.reduce(
    (sum, item) => sum + parseFloat(item.product.price as unknown as string) * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-white/5 shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h2 className="font-serif text-xl tracking-widest">YOUR RITE</h2>
              <button onClick={toggleCart} className="text-muted-foreground hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
                  <p className="tracking-widest uppercase text-sm">Your cart is empty</p>
                  <button 
                    onClick={toggleCart}
                    className="text-white hover:text-primary transition-colors text-sm underline underline-offset-4"
                  >
                    Continue Exploring
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-32 bg-secondary/50 overflow-hidden">
                      <img 
                        src={item.product.images[0] || "https://images.unsplash.com/photo-1550614000-4b95d4662130?w=400&q=80"} 
                        alt={item.product.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-lg leading-tight">{item.product.title}</h3>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors ml-2"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                          {item.variant.color} / {item.variant.size}
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div className="flex items-center border border-white/10 rounded-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-white/5 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-white/5 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="text-sm">${parseFloat(item.product.price as unknown as string).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-background/50">
                <div className="flex justify-between items-center mb-6">
                  <span className="uppercase tracking-widest text-sm text-muted-foreground">Subtotal</span>
                  <span className="text-xl font-serif">${total.toFixed(2)}</span>
                </div>
                <button className="w-full py-4 bg-foreground text-background font-medium tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  Proceed to Checkout
                </button>
                <p className="text-center text-xs text-muted-foreground mt-4">
                  Shipping & taxes calculated at checkout.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
