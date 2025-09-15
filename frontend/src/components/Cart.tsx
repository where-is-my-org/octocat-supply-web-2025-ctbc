import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getSubtotal, getShippingCost, clearCart } = useCart();
  const { darkMode } = useTheme();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  
  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'copilot25') {
      setDiscount(0.05); // 5% discount
    } else {
      setDiscount(0);
      alert('Invalid coupon code');
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  const handleQuantityChange = (productId: number, change: number) => {
    if (!Array.isArray(items)) return;
    
    const item = items.find(item => item && item.productId === productId);
    if (item) {
      updateQuantity(productId, Math.max(1, (item.quantity || 0) + change));
    }
  };

  const calculateItemTotal = (price: number, quantity: number, discount?: number) => {
    if (isNaN(price) || isNaN(quantity)) return 0;
    return discount 
      ? (price * (1 - discount) * quantity)
      : (price * quantity);
  };

  const subtotal = getSubtotal ? getSubtotal() : 0;
  const shippingCost = getShippingCost ? getShippingCost() : 0;
  const discountAmount = subtotal * discount;
  const grandTotal = subtotal - discountAmount + shippingCost;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300 mb-8`}>
          Shopping Cart
        </h1>
        
        {!Array.isArray(items) || items.length === 0 ? (
          <div className={`flex flex-col items-center justify-center py-12 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md transition-colors duration-300`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-24 w-24 ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-4`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className={`text-xl ${darkMode ? 'text-light' : 'text-gray-700'} mb-6`}>Your cart is empty</p>
            <Link to="/products" className="bg-primary hover:bg-accent text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className={`flex-grow ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden transition-colors duration-300`}>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors duration-300`}>
                      <th className="py-4 px-4 text-left">S. No.</th>
                      <th className="py-4 px-4 text-left">Product Image</th>
                      <th className="py-4 px-4 text-left">Product Name</th>
                      <th className="py-4 px-4 text-left">Unit Price</th>
                      <th className="py-4 px-4 text-left">Quantity</th>
                      <th className="py-4 px-4 text-left">Total</th>
                      <th className="py-4 px-4 text-left">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => {
                      const itemPrice = item.discount 
                        ? item.price * (1 - item.discount)
                        : item.price;
                      const itemTotal = calculateItemTotal(item.price, item.quantity, item.discount);
                      
                      return (
                        <tr key={item.productId} className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b transition-colors duration-300`}>
                          <td className={`py-4 px-4 ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                            {index + 1}
                          </td>
                          <td className="py-4 px-4">
                            <div className="w-20 h-20">
                              <img 
                                src={`/${item.imgName}`} 
                                alt={item.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </td>
                          <td className={`py-4 px-4 ${darkMode ? 'text-light' : 'text-gray-800'} font-medium`}>
                            {item.name}
                          </td>
                          <td className={`py-4 px-4 ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                            {item.discount ? (
                              <div>
                                <span className="text-gray-500 line-through text-sm mr-2">${item.price.toFixed(2)}</span>
                                <span className="text-primary">${itemPrice.toFixed(2)}</span>
                              </div>
                            ) : (
                              <span className="text-primary">${itemPrice.toFixed(2)}</span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            <div className={`flex items-center space-x-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg p-1 transition-colors duration-300 w-fit`}>
                              <button 
                                onClick={() => handleQuantityChange(item.productId, -1)}
                                className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                                aria-label={`Decrease quantity of ${item.name}`}
                              >
                                <span aria-hidden="true">-</span>
                              </button>
                              <span 
                                className={`${darkMode ? 'text-light' : 'text-gray-800'} min-w-[2rem] text-center transition-colors duration-300`}
                                aria-label={`Quantity of ${item.name}`}
                              >
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => handleQuantityChange(item.productId, 1)}
                                className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                <span aria-hidden="true">+</span>
                              </button>
                            </div>
                          </td>
                          <td className={`py-4 px-4 ${darkMode ? 'text-light' : 'text-gray-800'} font-semibold`}>
                            ${itemTotal.toFixed(2)}
                          </td>
                          <td className="py-4 px-4">
                            <button
                              onClick={() => removeFromCart(item.productId)}
                              className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="lg:w-80">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md transition-colors duration-300`}>
                <h2 className={`text-xl font-bold mb-6 ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                  Order Summary
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className={`${darkMode ? 'text-light' : 'text-gray-600'} transition-colors duration-300`}>Subtotal</span>
                    <span className={`font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className={`${darkMode ? 'text-light' : 'text-gray-600'} transition-colors duration-300`}>
                        Discount ({(discount * 100).toFixed(0)}%)
                      </span>
                      <span className="font-semibold text-red-500">
                        -${discountAmount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className={`${darkMode ? 'text-light' : 'text-gray-600'} transition-colors duration-300`}>
                      Shipping
                      {shippingCost === 0 && (
                        <span className="text-xs text-green-500 ml-1">(Free)</span>
                      )}
                    </span>
                    <span className={`font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                      ${shippingCost.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="my-4 border-t border-b py-4 border-gray-600">
                    <div className="flex justify-between">
                      <span className={`font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                        Grand Total
                      </span>
                      <span className="font-bold text-primary text-xl">
                        ${grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flex space-x-2 mb-4">
                      <input
                        type="text"
                        placeholder="Coupon Code"
                        className={`flex-grow px-4 py-2 ${darkMode ? 'bg-gray-700 text-light border-gray-600' : 'bg-white text-gray-800 border-gray-300'} border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300`}
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg transition-colors duration-300"
                      >
                        Apply
                      </button>
                    </div>
                    
                    <button className="w-full bg-primary hover:bg-accent text-white font-semibold py-3 rounded-lg transition-colors duration-300 mb-3">
                      Proceed To Checkout
                    </button>
                    <button 
                      onClick={handleClearCart}
                      className="w-full border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-semibold py-3 rounded-lg transition-colors duration-300"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
              
              <div className={`mt-4 p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md transition-colors duration-300`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
                  Free shipping on orders over $100!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
