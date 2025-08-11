"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/slices/cartSlice";
import OrderSummaryStep from "../components/checkout/order-summary-step";
import CustomerInfoStep from "../components/checkout/customer-info-step";
import PaymentMethodStep from "../components/checkout/payment-method-step";

export default function CheckoutModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [customerInfo, setCustomerInfo] =
    useState <
    CustomerInfo >
    {
      name: "",
      phone: "",
      address: "",
      notes: ""
    };
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";

      // Start animation immediately for first modal
      const openTimer = setTimeout(() => {
        setIsAnimating(true);
      }, 50);

      return () => clearTimeout(openTimer);
    } else {
      setIsAnimating(false);
      document.body.style.overflow = "unset";

      const closeTimer = setTimeout(() => {
        setShouldRender(false);
        // Reset to first step when modal closes
        setCurrentStep(1);
        setCustomerInfo({
          name: "",
          phone: "",
          address: "",
          notes: ""
        });
        setPaymentMethod("cash");
      }, 400);

      return () => clearTimeout(closeTimer);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleNextStep = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
      setTimeout(() => {
        setIsAnimating(true);
      }, 50);
    }, 200);
  };

  const handlePrevStep = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setCurrentStep((prev) => prev - 1);
      setTimeout(() => {
        setIsAnimating(true);
      }, 50);
    }, 200);
  };

  const handleCustomerInfoChange = (info) => {
    setCustomerInfo(info);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleFinalSubmit = () => {
    // Handle final order submission
    dispatch(clearCart());
    onClose();
  };

  if (!shouldRender) return null;

  return (
    <div className='fixed inset-0 z-[9999] overflow-hidden'>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-400 ease-out ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className='absolute inset-0 flex items-center justify-center p-4 overflow-hidden'>
        <Card
          className={`w-full max-w-2xl bg-white shadow-2xl transform transition-all duration-400 ease-out overflow-hidden ${
            isAnimating
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-8"
          }`}
          style={{ height: "80vh", maxHeight: "600px" }}
        >
          {/* Header */}
          <div className='flex items-center justify-between p-6 border-b bg-gradient-to-r from-red-50 to-white flex-shrink-0'>
            <div className='flex items-center space-x-4'>
              <h2
                className='text-2xl font-bold text-gray-900'
                style={{ fontFamily: "Arial" }}
              >
                {currentStep === 1 && "Votre commande"}
                {currentStep === 2 && "Informations de contact"}
                {currentStep === 3 && "Mode de paiement"}
              </h2>

              {/* Step Indicator */}
              <div className='flex items-center space-x-2'>
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      step === currentStep
                        ? "bg-red-600 text-white scale-110"
                        : step < currentStep
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step < currentStep ? "✓" : step}
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant='ghost'
              size='icon'
              onClick={handleClose}
              className='hover:bg-red-600/10 hover:text-red-600 transition-all duration-200 hover:rotate-90 hover:scale-110'
            >
              <X className='h-6 w-6' />
            </Button>
          </div>

          {/* Content */}
          <CardContent className='p-0 flex-1 overflow-hidden'>
            <div
              className={`h-full transition-all duration-300 ease-out ${
                isAnimating
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              }`}
            >
              {currentStep === 1 && (
                <OrderSummaryStep
                  onNext={handleNextStep}
                  onClose={handleClose}
                />
              )}
              {currentStep === 2 && (
                <CustomerInfoStep
                  customerInfo={customerInfo}
                  onCustomerInfoChange={handleCustomerInfoChange}
                  onNext={handleNextStep}
                  onPrev={handlePrevStep}
                />
              )}
              {currentStep === 3 && (
                <PaymentMethodStep
                  customerInfo={customerInfo}
                  paymentMethod={paymentMethod}
                  onPaymentMethodChange={handlePaymentMethodChange}
                  onPrev={handlePrevStep}
                  onSubmit={handleFinalSubmit}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
