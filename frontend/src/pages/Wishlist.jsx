import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">Your Wishlist</h1>
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-lg border shadow-sm">
          <p className="text-muted-foreground text-lg mb-4">Your wishlist is empty.</p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
