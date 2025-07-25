"use client";

import { useState, useEffect } from "react";
import { X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import DeliveryModal from "@/components/delivery-modal";

export default function Cart({ isOpen, onClose }) {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCart();
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const deliveryFee = 5; // Fixed delivery fee - changed from 500 to 5
  const totalWithDelivery =
    getTotalPrice() + (items.length > 0 ? deliveryFee : 0);

  useEffect(() => {
    if (isOpen) {
      // Start rendering the component
      setShouldRender(true);
      // Prevent body scroll when cart is open AND hide horizontal scroll
      document.body.style.overflow = "hidden";
      document.body.style.overflowX = "hidden";
      document.documentElement.style.overflowX = "hidden";

      // Trigger animation after a brief delay to ensure initial render
      const openTimer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);

      return () => clearTimeout(openTimer);
    } else {
      // Start closing animation
      setIsAnimating(false);
      // Re-enable body scroll when cart is closed
      document.body.style.overflow = "unset";
      document.body.style.overflowX = "unset";
      document.documentElement.style.overflowX = "unset";

      // Stop rendering after animation completes (faster)
      const closeTimer = setTimeout(() => {
        setShouldRender(false);
      }, 300);

      return () => clearTimeout(closeTimer);
    }
  }, [isOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.overflowX = "unset";
      document.documentElement.style.overflowX = "unset";
    };
  }, []);

  const handleCheckout = () => {
    setIsDeliveryOpen(true);
  };

  if (!shouldRender) return null;

  return (
    <>
      <div className='fixed inset-0 z-50 overflow-hidden'>
        {/* Backdrop with blur effect - faster animation */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 ease-out ${
            isAnimating ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        />

        {/* Cart Panel with enhanced animations - faster */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-all duration-300 ease-out overflow-x-hidden ${
            isAnimating
              ? "translate-x-0 scale-100 opacity-100"
              : "translate-x-full scale-95 opacity-0"
          }`}
          style={{
            transformOrigin: "right center"
          }}
        >
          <div className='flex h-full flex-col'>
            {/* Header with slide-down animation - faster */}
            <div
              className={`flex items-center justify-between p-4 border-b bg-gradient-to-r from-red-50 to-white transition-all duration-400 ease-out ${
                isAnimating
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: isAnimating ? "100ms" : "0ms" }}
            >
              <h2
                className='text-lg font-semibold text-gray-900'
                style={{ fontFamily: "Arial" }}
              >
                Votre panier
              </h2>
              <Button
                variant='ghost'
                size='icon'
                onClick={onClose}
                className='hover:bg-red-600/10 hover:text-red-600 transition-all duration-200 hover:rotate-90 hover:scale-110'
              >
                <X className='h-6 w-6' />
              </Button>
            </div>

            {/* Cart Items with staggered animations - faster */}
            <div className='flex-1 overflow-y-auto overflow-x-hidden p-4'>
              {items.length === 0 ? (
                <div
                  className={`flex flex-col items-center justify-center h-full text-center transition-all duration-400 ease-out ${
                    isAnimating
                      ? "translate-y-0 opacity-100 scale-100"
                      : "translate-y-8 opacity-0 scale-95"
                  }`}
                  style={{ transitionDelay: isAnimating ? "200ms" : "0ms" }}
                >
                  <div className='relative'>
                    <ShoppingBag
                      className={`h-16 w-16 text-gray-300 mb-4 ${
                        isAnimating ? "animate-bounce" : ""
                      }`}
                    />
                    <div className='absolute -top-2 -right-2 w-6 h-6 bg-red-100 rounded-full animate-ping'></div>
                  </div>
                  <h3
                    className='text-lg font-medium text-gray-900 mb-2'
                    style={{ fontFamily: "Arial" }}
                  >
                    Le panier est vide
                  </h3>
                  <p className='text-gray-500' style={{ fontFamily: "Arial" }}>
                    Ajoutez des plats du menu
                  </p>
                </div>
              ) : (
                <div className='space-y-4'>
                  {items.map((item, index) => (
                    <Card
                      key={item.id}
                      className={`shadow-sm hover:shadow-md transition-all duration-300 ease-out transform ${
                        isAnimating
                          ? "translate-x-0 opacity-100 scale-100"
                          : "translate-x-8 opacity-0 scale-95"
                      }`}
                      style={{
                        transitionDelay: isAnimating
                          ? `${150 + index * 50}ms`
                          : "0ms"
                      }}
                    >
                      <CardContent className='p-4 overflow-x-hidden'>
                        <div className='flex items-center space-x-4 min-w-0'>
                          <div className='relative overflow-hidden rounded-lg flex-shrink-0'>
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className='w-16 h-16 object-cover transition-transform duration-300 hover:scale-110'
                            />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <h4
                              className='font-medium text-gray-900 truncate'
                              style={{ fontFamily: "Arial" }}
                            >
                              {item.name}
                            </h4>
                            <p className='text-sm text-gray-500'>
                              {item.price}€
                            </p>
                            <div className='flex items-center space-x-2 mt-2'>
                              <Button
                                variant='outline'
                                size='sm'
                                onClick={() => {
                                  if (item.quantity === 1) {
                                    removeItem(item.id);
                                  } else {
                                    updateQuantity(item.id, item.quantity - 1);
                                  }
                                }}
                                className='h-8 w-8 p-0 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 hover:scale-110'
                              >
                                -
                              </Button>
                              <span className='text-sm font-medium w-8 text-center bg-gray-50 rounded px-2 py-1'>
                                {item.quantity}
                              </span>
                              <Button
                                variant='outline'
                                size='sm'
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className='h-8 w-8 p-0 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 hover:scale-110'
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          <div className='text-right'>
                            <p className='font-semibold text-gray-900'>
                              {item.price * item.quantity}€
                            </p>
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => removeItem(item.id)}
                              className='text-red-600 hover:text-red-700 hover:bg-red-600/10 mt-1 transition-all duration-200 hover:scale-105'
                            >
                              Supprimer
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with Total and Checkout - slide up animation faster */}
            {items.length > 0 && (
              <div
                className={`border-t p-4 space-y-4 bg-gradient-to-r from-white to-red-50 transition-all duration-400 ease-out ${
                  isAnimating
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: isAnimating ? "250ms" : "0ms" }}
              >
                <div className='space-y-2'>
                  <div className='flex justify-between font-semibold text-lg border-t pt-2'>
                    <span style={{ fontFamily: "Arial" }}>Sous-total</span>
                    <span>{getTotalPrice()}€</span>
                  </div>
                </div>
                <Button
                  onClick={handleCheckout}
                  className='w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg'
                  style={{ fontFamily: "Arial" }}
                >
                  Commander
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <DeliveryModal
        isOpen={isDeliveryOpen}
        onClose={() => setIsDeliveryOpen(false)}
        onCartClose={onClose}
      />
    </>
  );
}
