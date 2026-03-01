import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "./context/CartContext";
import { AnimatePresence, motion } from "framer-motion";

// Components
import { Layout } from "./components/layout/Layout";

// Pages
import { Home } from "./pages/Home";
import { Landing } from "./pages/Landing";
import { Shop } from "./pages/Shop";
import { ProductDetail } from "./pages/ProductDetail";
import { Collections } from "./pages/Collections";
import { CollectionDetail } from "./pages/CollectionDetail";
import { Lookbook } from "./pages/Lookbook";
import { About, Contact, Journal } from "./pages/editorial/EditorialPages";
import NotFound from "@/pages/not-found";

function Router() {
  const [hasEntered, setHasEntered] = useState(false);

  // Check if user has already entered this session
  useEffect(() => {
    const entered = sessionStorage.getItem("uonimiq_entered");
    if (entered) setHasEntered(true);
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
    sessionStorage.setItem("uonimiq_entered", "true");
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!hasEntered && (
          <Landing key="landing" onEnter={handleEnter} />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: hasEntered ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/shop" component={Shop} />
            <Route path="/products/:id" component={ProductDetail} />
            <Route path="/collections" component={Collections} />
            <Route path="/collections/:handle" component={CollectionDetail} />
            <Route path="/lookbook" component={Lookbook} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/journal" component={Journal} />
            {/* Redirects/Fallbacks for mock pages */}
            <Route path="/faq" component={Contact} />
            <Route path="/privacy" component={About} />
            <Route path="/terms" component={About} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </motion.div>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Router />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
