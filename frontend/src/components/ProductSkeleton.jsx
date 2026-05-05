import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm animate-pulse">
      <div className="aspect-square bg-muted/60"></div>
      <div className="flex flex-1 flex-col p-4">
        <div className="h-4 w-3/4 bg-muted/60 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-muted/60 rounded mb-4"></div>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="h-6 w-1/4 bg-muted/60 rounded"></div>
          <div className="h-8 w-8 rounded-full bg-muted/60"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
