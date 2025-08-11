"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DeliveryModal from "@/components/delivery-modal";
import { 
  selectCartItems, 
  selectCartTotalPrice, 
  updateQuantity, 
  removeItem 
} from "@/redux/slices/cartSlice";

export default function Cart({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const getTotalPrice = useSelector(selectCartTotalPrice);
  
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const deliveryFee = 5; // Fixed delivery fee
  const totalWithDelivery =
    getTotalPrice + (items.length > 0 ? deliveryFee : 0);

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

  const handleUpdateQuantity = (
    itemId,
    newQuantity,
    selectedOption = undefined
  ) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId, selectedOption);
    } else {
      dispatch(updateQuantity({ id: itemId, quantity: newQuantity, selectedOption }));
    }
  };

  const handleRemoveItem = (itemId, selectedOption = undefined) => {
    dispatch(removeItem({ id: itemId, selectedOption }));
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
            >
              <div className='flex items-center'>
                <ShoppingBag className='h-6 w-6 text-red-600 mr-2' />
                <h2
                  className='text-xl font-bold text-gray-900'
                  style={{ fontFamily: "Arial" }}
                >
                  Votre panier
                </h2>
              </div>
              <Button
                variant='ghost'
                size='icon'
                onClick={onClose}
                className='rounded-full h-8 w-8 hover:bg-red-600/10 hover:text-red-600 transition-all duration-200'
              >
                <X className='h-5 w-5' />
                <span className='sr-only'>Fermer</span>
              </Button>
            </div>
            {/* Cart Content with fade-in animation - faster */}
            <div
              className={`flex-1 overflow-auto p-4 transition-all duration-400 ease-out ${
                isAnimating ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: isAnimating ? "150ms" : "0ms" }}
            >
              {items.length === 0 ? (
                <div className='flex flex-col items-center justify-center h-full text-center'>
                  <ShoppingBag className='h-16 w-16 text-gray-300 mb-4' />
                  <h3
                    className='text-xl font-semibold text-gray-900 mb-2'
                    style={{ fontFamily: "Arial" }}
                  >
                    Votre panier est vide
                  </h3>
                  <p className='text-gray-500 mb-6'>
                    Ajoutez des articles à votre panier pour passer commande
                  </p>
                  <Button
                    onClick={onClose}
                    className='bg-red-600 hover:bg-red-700 text-white transition-all duration-300 transform hover:scale-105'
                    style={{ fontFamily: "Arial" }}
                  >
                    Parcourir le menu
                  </Button>
                </div>
              ) : (
                <div className='space-y-4'>
                  {items.map((item) => (
                    <Card
                      key={`${item.id}-${item.selectedOption || "default"}`}
                      className='overflow-hidden border-gray-200 hover:border-red-200 transition-all duration-200'
                    >
                      <CardContent className='p-4 grid grid-cols-[80px_1fr_auto] gap-4'>
                        <div className='relative h-20 w-20 rounded-md overflow-hidden bg-gray-100'>
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className='h-full w-full object-cover'
                            />
                          ) : (
                            <div className='flex items-center justify-center h-full w-full bg-gray-200 text-gray-500 text-xs'>
                              No image
                            </div>
                          )}
                        </div>
                        <div className='flex flex-col justify-between'>
                          <div>
                            <h3
                              className='font-semibold text-gray-900 line-clamp-1'
                              style={{ fontFamily: "Arial" }}
                            >
                              {item.name}
                            </h3>
                            {item.selectedOption && (
                              <p className='text-sm text-gray-500 mt-1'>
                                {item.selectedOption}
                              </p>
                            )}
                          </div>
                          <div className='flex items-center space-x-2 mt-2'>
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={() => {
                                if (item.quantity > 1) {
                                  handleUpdateQuantity(
                                    item.id,
                                    item.quantity - 1,
                                    item.selectedOption
                                  );
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
                                handleUpdateQuantity(
                                  item.id,
                                  item.quantity + 1,
                                  item.selectedOption
                                )
                              }
                              className='h-8 w-8 p-0 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 hover:scale-110'
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div className='text-right'>
                          <p className='font-semibold text-gray-900'>
                            {(item.price * item.quantity).toFixed(2)}€
                          </p>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() =>
                              handleRemoveItem(item.id, item.selectedOption)
                            }
                            className='text-red-600 hover:text-red-700 hover:bg-red-600/10 mt-1 transition-all duration-200'
                          >
                            Supprimer
                          </Button>
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
                    <span>{getTotalPrice.toFixed(2)}€</span>
                  </div>
                </div>
                <Button
                  onClick={handleCheckout}
                  className='w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold transition-all duration-300 transform hover:shadow-lg'
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
