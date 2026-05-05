import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Heart, Star, ArrowLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { toggleWishlist } from '../features/wishlist/wishlistSlice';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const isWishlisted = product ? wishlistItems.some((item) => item._id === product._id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
        // Map id to _id for consistency with existing cart/wishlist logic
        setProduct({ ...data, _id: data.id.toString() });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details.');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      toast.success('Added to cart!');
    }
  };

  const handleToggleWishlist = () => {
    if (product) {
      dispatch(toggleWishlist(product));
      if (isWishlisted) {
        toast('Removed from wishlist', { icon: '💔' });
      } else {
        toast.success('Added to wishlist!');
      }
    }
  };

  const dummyReviews = [
    { id: 1, user: "Alex J.", rating: 5, comment: "Absolutely love this product! The quality is outstanding." },
    { id: 2, user: "Samantha K.", rating: 4, comment: "Great value for the price. Would highly recommend." },
    { id: 3, user: "Michael B.", rating: 5, comment: "Exceeded my expectations. Will buy again!" }
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-destructive">
        <p>{error || 'Product not found.'}</p>
        <Link to="/" className="inline-block mt-4 text-foreground hover:text-rose-500">
          &larr; Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
      </Link>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        {/* Product Image */}
        <div className="w-full md:w-1/2 lg:w-5/12">
          <div className="bg-white p-8 rounded-2xl border border-border flex items-center justify-center aspect-[4/5] shadow-sm">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 lg:w-7/12 flex flex-col justify-center">
          <p className="text-sm text-rose-500 font-semibold uppercase tracking-widest mb-2">
            {product.category}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            {product.title}
          </h1>
          
          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(Math.round(product.rating?.rate || 4))].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.rating?.count || 120} reviews)
            </span>
          </div>

          <p className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            ${product.price?.toFixed(2)}
          </p>

          <p className="text-muted-foreground leading-relaxed mb-10 text-lg">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-foreground text-background py-4 px-8 rounded-full font-semibold hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button 
              onClick={handleToggleWishlist}
              className={`flex items-center justify-center gap-2 py-4 px-8 rounded-full font-semibold border transition-colors ${
                isWishlisted 
                ? 'border-rose-500 text-rose-500 bg-rose-50 hover:bg-rose-100' 
                : 'border-border text-foreground bg-white hover:bg-muted'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} /> 
              {isWishlisted ? 'Wishlisted' : 'Wishlist'}
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-20 pt-16 border-t border-border">
        <h2 className="text-2xl font-bold text-foreground mb-8 uppercase tracking-wide">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyReviews.map(review => (
            <div key={review.id} className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold mr-3">
                  {review.user.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{review.user}</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm italic">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
