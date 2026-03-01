import React, { useState } from 'react';
import { useProducts } from '@/hooks/use-products';
import { ProductCard } from '@/components/product-card';
import { motion } from 'framer-motion';
import { Filter, ChevronDown } from 'lucide-react';

export default function Shop() {
  const { data: products, isLoading } = useProducts();
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...Array.from(new Set(products?.map(p => p.category) || []))];

  const filteredProducts = filter === 'all' 
    ? products 
    : products?.filter(p => p.category === filter);

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="font-serif text-5xl mb-4">The Armory</h1>
        <p className="text-muted-foreground tracking-widest uppercase text-sm">All pieces currently summoned.</p>
      </motion.div>

      {/* Utilities bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-border pb-6 gap-6">
        <div className="flex items-center gap-6 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-sm tracking-widest uppercase whitespace-nowrap transition-colors ${
                filter === cat ? 'text-primary border-b border-primary pb-1' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat === 'all' ? 'All Pieces' : cat}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4 text-sm tracking-widest uppercase text-muted-foreground">
          <button className="flex items-center gap-2 hover:text-foreground transition-colors">
            Sort <ChevronDown size={14} />
          </button>
          <div className="w-[1px] h-4 bg-border"></div>
          <button className="flex items-center gap-2 hover:text-foreground transition-colors md:hidden">
            Filter <Filter size={14} />
          </button>
          <span className="hidden md:inline">{filteredProducts?.length || 0} Pieces</span>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="aspect-[3/4] bg-secondary/30 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
          {filteredProducts?.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
          {filteredProducts?.length === 0 && (
            <div className="col-span-full py-24 text-center text-muted-foreground font-serif text-xl">
              No pieces found in this category.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
