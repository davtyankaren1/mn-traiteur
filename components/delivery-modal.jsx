"use client";

import { useState, useEffect } from "react";
import {
  X,
  User,
  Phone,
  MapPin,
  CreditCard,
  Banknote,
  CheckCircle,
  Truck
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { useCart } from "../contexts/cart-context";
import { toast } from "sonner";

export default function DeliveryModal({ isOpen, onClose, onCartClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errors, setErrors] = useState({});
  const { items, getTotalPrice, clearCart } = useCart();

  const deliveryFee = 5;
  const totalWithDelivery = getTotalPrice() + deliveryFee;

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
      setTimeout(() => setIsAnimating(true), 50);
    } else {
      setIsAnimating(false);
      document.body.style.overflow = "unset";
      setTimeout(() => {
        setShouldRender(false);
        setCurrentStep(1);
        setCustomerInfo({ name: "", phone: "", address: "" });
        setPaymentMethod("");
        setErrors({});
      }, 400);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!customerInfo.name.trim()) {
      newErrors.name = "Le nom est obligatoire";
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = "Le numéro de téléphone est obligatoire";
    }

    if (!customerInfo.address.trim()) {
      newErrors.address = "L'adresse est obligatoire";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateForm()) {
      setIsAnimating(false);
      setTimeout(() => {
        setCurrentStep(2);
        setTimeout(() => setIsAnimating(true), 50);
      }, 200);
    }
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
    setIsAnimating(false);
    setTimeout(() => {
      setCurrentStep(3);
      setTimeout(() => setIsAnimating(true), 50);
    }, 200);
  };

  const handleFinalConfirm = () => {
    clearCart();
    toast.success(
      "Votre commande a été confirmée ! Nous vous contacterons bientôt."
    );
    onClose();
    onCartClose();
  };

  if (!shouldRender) return null;

  return (
    <div className='fixed inset-0 z-[9999] overflow-hidden'>
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-400 ease-out ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div className='absolute inset-0 flex items-center justify-center p-4'>
        <Card
          className={`w-full max-w-md bg-white shadow-2xl transform transition-all duration-400 ease-out ${
            isAnimating
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-8"
          }`}
        >
          <div className='flex items-center justify-between p-6 border-b bg-gradient-to-r from-red-50 to-white'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-red-600 rounded-full flex items-center justify-center'>
                {currentStep === 1 && <User className='w-5 h-5 text-white' />}
                {currentStep === 2 && (
                  <CreditCard className='w-5 h-5 text-white' />
                )}
                {currentStep === 3 && (
                  <CheckCircle className='w-5 h-5 text-white' />
                )}
              </div>
              <h2
                className='text-xl font-bold text-gray-900'
                style={{ fontFamily: "Arial" }}
              >
                {currentStep === 1 && "Informations de livraison"}
                {currentStep === 2 && "Mode de paiement"}
                {currentStep === 3 && "Commande confirmée"}
              </h2>
            </div>
            <Button
              variant='ghost'
              size='icon'
              onClick={onClose}
              className='hover:bg-red-600/10 hover:text-red-600 transition-all duration-200'
            >
              <X className='h-6 w-6' />
            </Button>
          </div>

          <CardContent className='p-4'>
            <div
              className={`transition-all duration-300 ease-out ${
                isAnimating
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4"
              }`}
            >
              {currentStep === 1 && (
                <div className='space-y-4'>
                  <div className='text-center mb-4'>
                    <p
                      className='text-gray-600 text-sm'
                      style={{ fontFamily: "Arial" }}
                    >
                      Veuillez remplir vos informations pour la livraison
                    </p>
                  </div>

                  <div className='space-y-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div>
                        <Label
                          htmlFor='name'
                          className='text-sm font-medium text-gray-700 flex items-center mb-1'
                        >
                          <User className='h-4 w-4 mr-2 text-red-600' />
                          Nom complet *
                        </Label>
                        <Input
                          id='name'
                          name='name'
                          type='text'
                          value={customerInfo.name}
                          onChange={handleInputChange}
                          className={`transition-all duration-200 ${
                            errors.name
                              ? "border-red-500 focus:border-red-500"
                              : "focus:border-red-600"
                          }`}
                          placeholder='Votre nom complet'
                        />
                        {errors.name && (
                          <p className='text-xs text-red-500 mt-1'>
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label
                          htmlFor='phone'
                          className='text-sm font-medium text-gray-700 flex items-center mb-1'
                        >
                          <Phone className='h-4 w-4 mr-2 text-red-600' />
                          Téléphone *
                        </Label>
                        <Input
                          id='phone'
                          name='phone'
                          type='tel'
                          value={customerInfo.phone}
                          onChange={handleInputChange}
                          className={`transition-all duration-200 ${
                            errors.phone
                              ? "border-red-500 focus:border-red-500"
                              : "focus:border-red-600"
                          }`}
                          placeholder='+33 X XX XX XX XX'
                        />
                        {errors.phone && (
                          <p className='text-xs text-red-500 mt-1'>
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor='address'
                        className='text-sm font-medium text-gray-700 flex items-center mb-1'
                      >
                        <MapPin className='h-4 w-4 mr-2 text-red-600' />
                        Adresse de livraison *
                      </Label>
                      <Textarea
                        id='address'
                        name='address'
                        rows={2}
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        className={`transition-all duration-200 resize-none ${
                          errors.address
                            ? "border-red-500 focus:border-red-500"
                            : "focus:border-red-600"
                        }`}
                        placeholder='Votre adresse complète'
                      />
                      {errors.address && (
                        <p className='text-xs text-red-500 mt-1'>
                          {errors.address}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='bg-red-50 rounded-lg p-3 space-y-1'>
                    <h3
                      className='font-semibold text-gray-900 mb-2 text-sm'
                      style={{ fontFamily: "Arial" }}
                    >
                      Résumé de la commande
                    </h3>
                    <div className='flex justify-between text-sm'>
                      <span>Plats ({items.length})</span>
                      <span>{getTotalPrice()}€</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span>Livraison</span>
                      <span>{deliveryFee}€</span>
                    </div>
                    <div className='border-t border-red-200 pt-1 mt-1'>
                      <div className='flex justify-between font-bold'>
                        <span>Total</span>
                        <span className='text-red-600'>
                          {totalWithDelivery}€
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleNextStep}
                    className='w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105'
                  >
                    Suivant
                  </Button>
                </div>
              )}

              {currentStep === 2 && (
                <div className='space-y-6'>
                  <div className='text-center mb-6'>
                    <p
                      className='text-gray-600'
                      style={{ fontFamily: "Arial" }}
                    >
                      Choisissez votre mode de paiement
                    </p>
                  </div>

                  <div className='space-y-4'>
                    <button
                      onClick={() => handlePaymentSelect("cash")}
                      className='w-full p-4 border-2 border-gray-200 rounded-lg hover:border-red-600 hover:bg-red-50 transition-all duration-200 flex items-center space-x-4'
                    >
                      <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center'>
                        <Banknote className='w-6 h-6 text-green-600' />
                      </div>
                      <div className='flex-1 text-left'>
                        <h3
                          className='font-semibold text-gray-900'
                          style={{ fontFamily: "Arial" }}
                        >
                          Paiement en espèces
                        </h3>
                        <p className='text-sm text-gray-600'>
                          Payez directement au livreur
                        </p>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePaymentSelect("pos")}
                      className='w-full p-4 border-2 border-gray-200 rounded-lg hover:border-red-600 hover:bg-red-50 transition-all duration-200 flex items-center space-x-4'
                    >
                      <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
                        <CreditCard className='w-6 h-6 text-blue-600' />
                      </div>
                      <div className='flex-1 text-left'>
                        <h3
                          className='font-semibold text-gray-900'
                          style={{ fontFamily: "Arial" }}
                        >
                          Terminal de paiement
                        </h3>
                        <p className='text-sm text-gray-600'>
                          Paiement par carte avec le livreur
                        </p>
                      </div>
                    </button>
                  </div>

                  <Button
                    variant='outline'
                    onClick={() => {
                      setIsAnimating(false);
                      setTimeout(() => {
                        setCurrentStep(1);
                        setTimeout(() => setIsAnimating(true), 50);
                      }, 200);
                    }}
                    className='w-full border-gray-300 hover:bg-gray-50'
                  >
                    Retour
                  </Button>
                </div>
              )}

              {currentStep === 3 && (
                <div className='text-center space-y-4'>
                  <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto'>
                    <CheckCircle className='w-8 h-8 text-green-600' />
                  </div>

                  <div>
                    <h3
                      className='text-xl font-bold text-gray-900 mb-1'
                      style={{ fontFamily: "Arial" }}
                    >
                      Commande acceptée !
                    </h3>
                    <p
                      className='text-gray-600 text-sm'
                      style={{ fontFamily: "Arial" }}
                    >
                      Votre livraison a été acceptée avec succès
                    </p>
                  </div>

                  <div className='bg-green-50 rounded-lg p-3'>
                    <div className='flex items-center justify-center space-x-2 text-green-700 mb-1'>
                      <Truck className='w-4 h-4' />
                      <span className='font-semibold text-sm'>
                        Livraison en cours de préparation
                      </span>
                    </div>
                    <p className='text-xs text-green-600'>
                      Nous vous contacterons dans les 15 minutes
                    </p>
                  </div>

                  <div className='text-left bg-gray-50 rounded-lg p-3 space-y-1'>
                    <h4 className='font-semibold text-gray-900 text-sm mb-2'>
                      Détails :
                    </h4>
                    <div className='text-sm space-y-1'>
                      <div className='flex justify-between'>
                        <span>Nom :</span>
                        <span className='font-medium'>{customerInfo.name}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Téléphone :</span>
                        <span className='font-medium'>
                          {customerInfo.phone}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span>Paiement :</span>
                        <span className='font-medium'>
                          {paymentMethod === "cash" ? "Espèces" : "Terminal"}
                        </span>
                      </div>
                      <div className='flex justify-between font-bold text-red-600 border-t pt-1'>
                        <span>Total :</span>
                        <span>{totalWithDelivery}€</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleFinalConfirm}
                    className='w-full bg-green-600 hover:bg-green-700 text-white py-2 font-semibold transition-all duration-300 transform hover:scale-105'
                  >
                    Parfait !
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
