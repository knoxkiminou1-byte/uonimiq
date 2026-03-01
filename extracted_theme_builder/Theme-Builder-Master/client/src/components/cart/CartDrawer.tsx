import { ShoppingBag, X, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/hooks/use-shop";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md bg-background border-l border-border p-0 flex flex-col rounded-none">
        <SheetHeader className="p-6 border-b border-border bg-card">
          <SheetTitle className="font-display font-normal tracking-widest text-xl flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-primary" />
            YOUR CART
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <ShoppingBag className="w-12 h-12 mb-2" />
              <p className="font-display text-lg tracking-wider">Your cart is empty.</p>
              <Button 
                variant="outline" 
                className="mt-4 rounded-none border-primary/50 hover:bg-primary hover:text-primary-foreground tracking-widest"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 group">
                <div className="w-24 h-32 bg-muted overflow-hidden relative">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex-1 flex flex-col py-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-sm tracking-wide leading-tight">
                      {item.product.title}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-muted-foreground text-xs mt-1 tracking-wider">
                    {item.product.category}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs tracking-wider">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-muted transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="font-display tracking-wider">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-border bg-card space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="tracking-widest text-muted-foreground uppercase">Subtotal</span>
              <span className="font-display text-xl">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-xs text-muted-foreground tracking-wide text-center pb-2">
              Shipping & taxes calculated at checkout
            </p>
            <Button className="w-full rounded-none h-14 bg-primary text-primary-foreground hover:bg-primary/90 font-display tracking-[0.2em] text-sm uppercase">
              Proceed to Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
