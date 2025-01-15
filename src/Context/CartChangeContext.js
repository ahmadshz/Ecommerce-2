import { createContext, useState, useEffect } from 'react';

// Create the Cart context
export const CartContext = createContext();

const CartChangeContext = ({ children }) => {
  // Initialize cart from localStorage or set to an empty array
  const [cart, setCart] = useState(() => {

    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add an item to the cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      // Check if the item already exists in the cart
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        // Increment the quantity of the existing item
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Add the new item with quantity initialized to 1
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };


  // Increment quantity of product in cart
  const increment = (itemId) => {
    setCart((prev) => prev.map((item) =>
      item.id === itemId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ))
  }

  // Decrement quantity of product in cart

  const decrement = (itemId) => {
    setCart((prev) =>
      prev.map((item) => item.id === itemId ?
        { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity }
        : item
      ))
  }

  // Remove an item from the cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  // Clear the entire cart
  const clearAllCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increment, decrement, clearAllCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartChangeContext;
