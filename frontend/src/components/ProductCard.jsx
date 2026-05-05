import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { toggleWishlist } from '../features/wishlist/wishlistSlice';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
    toast.success('Added to cart!');
  };
  
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
    if (isWishlisted) {
      toast('Removed from wishlist', { icon: '💔' });
    } else {
      toast.success('Added to wishlist!');
    }
  };

  return (
    <Link to={`/product/${product._id}`} className="group relative flex flex-col text-foreground transition-all duration-300">
      <div className="relative overflow-hidden bg-muted/30 aspect-[4/5] rounded-xl mb-4 shadow-sm group-hover:shadow-md transition-shadow">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Hover ActionsOverlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
          <button 
            onClick={handleToggleWishlist}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-muted-foreground hover:text-rose-500 transition-colors shadow-md hover:shadow-lg"
            title="Wishlist"
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
          <button 
            onClick={handleAddToCart}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-muted-foreground hover:text-foreground transition-colors shadow-md hover:shadow-lg"
            title="Add to Cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="flex flex-col px-1">
        <h3 className="truncate text-sm font-medium mb-1 group-hover:text-rose-500 transition-colors">
          {product.title}
        </h3>
        <span className="text-sm font-semibold">${product.price.toFixed(2)}</span>
      </div>
    </Link>
  );
};

export default ProductCard;
