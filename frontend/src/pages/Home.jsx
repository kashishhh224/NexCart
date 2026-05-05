import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import Hero from '../components/home/Hero';
import ProductSection from '../components/home/ProductSection';
import Features from '../components/home/Features';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
  const dispatch = useDispatch();
  const { items: products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // For demonstration, let's split the products into two lists if available.
  const latestCollections = products?.slice(0, 10) || [];
  const bestSellers = products?.slice(10, 20) || products?.slice(0, 10) || []; // Fallback to first 10 if not enough items

  return (
    <div className="flex flex-col min-h-screen bg-background w-full">
      <Hero />
      
      <div className="w-full">
        <ProductSection 
          title="Latest Collections" 
          subtitle="Discover our newest arrivals with cutting-edge style and uncompromising quality. Perfect for updating your wardrobe this season."
          products={latestCollections}
          loading={status === 'loading'}
          error={status === 'failed' ? error : null}
        />
        
        <ProductSection 
          title="Best Sellers" 
          subtitle="Our most loved pieces chosen by customers just like you. Shop these proven favorites before they sell out again."
          products={bestSellers}
          loading={status === 'loading'}
          error={status === 'failed' ? error : null}
        />
      </div>

      <Features />
      <Newsletter />
    </div>
  );
};

export default Home;
