import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User as UserIcon, Search, LogOut, Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useState } from 'react';

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const wishlistCount = wishlistItems.length;

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={toggleMenu} className="text-foreground hover:text-rose-500 transition-colors p-2 -ml-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Left: Brand Name */}
          <div className="flex items-center justify-center md:justify-start flex-1 md:flex-none">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-3xl font-extrabold tracking-tighter prata-regular text-foreground">NexCart</span>
            </Link>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
            <Link to="/" className="text-sm font-medium text-foreground uppercase tracking-widest hover:text-rose-500 transition-colors py-2">Home</Link>
            <Link to="/collection" className="text-sm font-medium text-foreground uppercase tracking-widest hover:text-rose-500 transition-colors py-2 border-b-2 border-foreground">Collection</Link>
            <Link to="/about" className="text-sm font-medium text-foreground uppercase tracking-widest hover:text-rose-500 transition-colors py-2">About</Link>
            <Link to="/contact" className="text-sm font-medium text-foreground uppercase tracking-widest hover:text-rose-500 transition-colors py-2">Contact</Link>
          </div>

          {/* Right: Icons & Admin Button */}
          <div className="flex items-center gap-3 sm:gap-5 justify-end flex-1 md:flex-none">
            <button className="text-foreground hover:text-rose-500 transition-colors hidden sm:block p-1">
              <Search className="h-5 w-5" />
            </button>

            <Link
              to="/wishlist"
              className="relative text-foreground hover:text-rose-500 transition-colors p-1"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 text-[10px] font-bold text-white bg-rose-500 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative text-foreground hover:text-rose-500 transition-colors p-1"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 text-[10px] font-bold text-white bg-rose-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="flex items-center gap-3 border-l border-border pl-3 sm:pl-5 ml-1 sm:ml-2">
                <Link to="/profile" className="text-foreground hover:text-rose-500 transition-colors p-1 hidden sm:block">
                  <UserIcon className="h-5 w-5" />
                </Link>
                {userInfo.isAdmin && (
                  <Link to="/admin" className="hidden lg:inline-flex items-center justify-center px-4 py-2 text-xs font-bold tracking-widest uppercase text-white bg-foreground hover:bg-foreground/80 rounded-full transition-colors">
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={logoutHandler}
                  className="text-foreground hover:text-rose-500 transition-colors p-1"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center border-l border-border pl-3 sm:pl-5 ml-1 sm:ml-2">
                <Link
                  to="/login"
                  className="text-foreground hover:text-rose-500 transition-colors p-1"
                >
                  <UserIcon className="h-5 w-5" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link to="/" onClick={toggleMenu} className="text-base font-medium text-foreground uppercase tracking-wider hover:text-rose-500 transition-colors px-2">Home</Link>
              <Link to="/collection" onClick={toggleMenu} className="text-base font-medium text-rose-500 uppercase tracking-wider px-2 border-l-2 border-rose-500">Collection</Link>
              <Link to="/about" onClick={toggleMenu} className="text-base font-medium text-foreground uppercase tracking-wider hover:text-rose-500 transition-colors px-2">About</Link>
              <Link to="/contact" onClick={toggleMenu} className="text-base font-medium text-foreground uppercase tracking-wider hover:text-rose-500 transition-colors px-2">Contact</Link>
              {userInfo?.isAdmin && (
                <Link to="/admin" onClick={toggleMenu} className="text-base font-medium text-foreground uppercase tracking-wider hover:text-rose-500 transition-colors px-2">Admin Panel</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
