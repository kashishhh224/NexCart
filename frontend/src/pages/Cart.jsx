import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, addToCart } from '../features/cart/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const updateQuantity = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty })); // Will update qty if it exists
    } else {
      removeFromCartHandler(item._id);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-lg border shadow-sm">
          <p className="text-muted-foreground text-lg mb-4">Your cart is empty.</p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg bg-card shadow-sm">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1 text-center sm:text-left">
                  <Link to={`/product/${item._id}`} className="font-semibold text-lg hover:underline">{item.title}</Link>
                  <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item, item.qty - 1)} className="p-1 px-3 border rounded-md hover:bg-muted">-</button>
                  <span className="w-8 text-center">{item.qty}</span>
                  <button onClick={() => updateQuantity(item, item.qty + 1)} className="p-1 px-3 border rounded-md hover:bg-muted">+</button>
                </div>
                <button 
                  onClick={() => removeFromCartHandler(item._id)}
                  className="mt-4 sm:mt-0 p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="p-6 border rounded-lg bg-card shadow-sm h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            </div>
            <button className="w-full py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
