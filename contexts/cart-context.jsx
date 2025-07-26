"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(undefined);

const CART_STORAGE_KEY = "restaurant-cart";

const saveCartToLocalStorage = (cartItems) => {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const loadCartFromLocalStorage = () => {
  try {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    }
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
  }
  return [];
};

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedItems = loadCartFromLocalStorage();
    setItems(savedItems);
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever items change (but only after initial load)
  useEffect(() => {
    if (isLoaded) {
      saveCartToLocalStorage(items);
    }
  }, [items, isLoaded]);

  const addItem = (newItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }
      return [...prev, newItem];
    });
  };

  const updateQuantity = (id, quantity) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        getTotalPrice,
        isLoaded
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
