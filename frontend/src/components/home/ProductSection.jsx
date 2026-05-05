import React from 'react';
import ProductCard from '../ProductCard';
import ProductSkeleton from '../ProductSkeleton';

const ProductSection = ({ title, subtitle, products = [], loading = false, error = null }) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 mb-3">
            <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase">{title}</h2>
          </div>
          {subtitle && (
            <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        {/* Content */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {[...Array(5)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-destructive">
            <p>Error loading products: {error}</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No products found in this section.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default ProductSection;
