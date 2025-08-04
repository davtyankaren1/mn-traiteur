"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from "react";

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

const CartContext = createContext(null); // Changed to null for initial context value

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

  // MODIFIED: addItem now accepts an optional selectedOption
  const addItem = useCallback((newItem) => {
    setItems((prev) => {
      // Check if an item with the same ID AND selected option already exists
      const existing = prev.find(
        (i) =>
          i.id === newItem.id && i.selectedOption === newItem.selectedOption
      );
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id && i.selectedOption === newItem.selectedOption
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }
      return [...prev, newItem];
    });
  }, []);

  // MODIFIED: updateQuantity now considers selectedOption for unique identification
  const updateQuantity = useCallback(
    (id, quantity, selectedOption = undefined) => {
      setItems((prev) =>
        prev.map((i) =>
          i.id === id && i.selectedOption === selectedOption
            ? { ...i, quantity: Math.max(1, quantity) }
            : i
        )
      );
    },
    []
  );

  // MODIFIED: removeItem now considers selectedOption for unique identification
  const removeItem = useCallback((id, selectedOption = undefined) => {
    setItems((prev) =>
      prev.filter((i) => !(i.id === id && i.selectedOption === selectedOption))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // MODIFIED: Ensure price calculations are done with cents to avoid floating point errors
  const getTotalPrice = useCallback(() => {
    const totalCents = items.reduce((sum, item) => {
      // Convert item price to cents, then multiply by quantity
      // Math.round is used to handle any potential floating point issues when multiplying by 100
      const itemPriceInCents = Math.round(item.price * 100);
      return sum + itemPriceInCents * item.quantity;
    }, 0);
    // Convert total cents back to euros
    return totalCents / 100;
  }, [items]);

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
  const context = useContext(CartContext); // Changed ctx to context for consistency
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
