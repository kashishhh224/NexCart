import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';

const Collection = () => {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector((state) => state.products);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const categories = ['All', ...new Set(products.map(p => p.category))];
  
  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tight text-foreground mb-2">All Collections</h1>
          <p className="text-muted-foreground">Discover our complete range of products.</p>
        </div>
        
        {/* Basic Filtering */}
        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto hide-scrollbar">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === category 
                  ? 'bg-foreground text-background' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {status === 'loading' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {[...Array(10)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      )}

      {status === 'failed' && (
        <div className="text-center py-20 text-destructive">
          <p>Error: {error}</p>
        </div>
      )}

      {status === 'succeeded' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No products found in this category.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Collection;
