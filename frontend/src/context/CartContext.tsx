import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imgName: string;
  discount?: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getShippingCost: () => number;
  getTotal: () => number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  // Load cart from localStorage on initial render
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (!savedCart) return [];
      
      const parsedCart = JSON.parse(savedCart);
      // Ensure the parsed data is an array
      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    try {
      if (Array.isArray(items)) {
        localStorage.setItem('cart', JSON.stringify(items));
      }
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [items]);

  const addToCart = (product: CartItem) => {
    setItems(prevItems => {
      // Ensure prevItems is an array
      const safeItems = Array.isArray(prevItems) ? prevItems : [];
      const existingItem = safeItems.find(item => item && item.productId === product.productId);
      
      if (existingItem) {
        return safeItems.map(item => 
          item && item.productId === product.productId 
            ? { ...item, quantity: (item.quantity || 0) + (product.quantity || 0) } 
            : item
        );
      } else {
        return [...safeItems, product];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setItems(prevItems => {
      // Ensure prevItems is an array
      const safeItems = Array.isArray(prevItems) ? prevItems : [];
      return safeItems.filter(item => item && item.productId !== productId);
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setItems(prevItems => {
      // Ensure prevItems is an array
      const safeItems = Array.isArray(prevItems) ? prevItems : [];
      return safeItems
        .map(item => 
          item && item.productId === productId 
            ? { ...item, quantity } 
            : item
        )
        .filter(item => item && item.quantity > 0);
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = () => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((count, item) => count + (item?.quantity || 0), 0);
  };

  const getSubtotal = () => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((sum, item) => {
      if (!item) return sum;
      const itemPrice = item.discount 
        ? item.price * (1 - item.discount)
        : item.price;
      return sum + (itemPrice * (item.quantity || 0));
    }, 0);
  };

  const getShippingCost = () => {
    const subtotal = getSubtotal();
    // Free shipping for orders over $100, otherwise $25
    return subtotal >= 100 ? 0 : 25;
  };

  const getTotal = () => {
    return getSubtotal() + getShippingCost();
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItemCount,
      getSubtotal,
      getShippingCost,
      getTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook for using the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
