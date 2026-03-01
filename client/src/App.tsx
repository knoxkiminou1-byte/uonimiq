import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout";

// Pages
import Home from "@/pages/home";
import Shop from "@/pages/shop";
import ProductDetail from "@/pages/product-detail";
import Collections from "@/pages/collections";
import CollectionDetail from "@/pages/collection-detail";
import Lookbook from "@/pages/lookbook";
import About from "@/pages/about";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/pages/shop" component={Shop} />
        <Route path="/product/:slug" component={ProductDetail} />
        <Route path="/products/:slug" component={ProductDetail} />
        <Route path="/collections" component={Collections} />
        <Route path="/collections/:slug" component={CollectionDetail} />
        <Route path="/lookbook" component={Lookbook} />
        <Route path="/pages/lookbook" component={Lookbook} />
        <Route path="/about" component={About} />
        <Route path="/pages/about" component={About} />
        
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
