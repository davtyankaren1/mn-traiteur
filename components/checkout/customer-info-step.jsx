"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  User,
  Phone,
  MapPin,
  MessageSquare,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

export default function CustomerInfoStep({
  customerInfo,
  onCustomerInfoChange,
  onNext,
  onPrev
}) {
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedInfo = { ...customerInfo, [name]: value };
    onCustomerInfoChange(updatedInfo);

    // Clear error when user starts typing
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
    } else if (
      !/^\+374\s?\d{2}\s?\d{3}\s?\d{3}$/.test(
        customerInfo.phone.replace(/\s/g, "")
      )
    ) {
      newErrors.phone = "Le format du numéro de téléphone est incorrect";
    }

    if (!customerInfo.address.trim()) {
      newErrors.address = "L'adresse est obligatoire";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className='p-6 h-full flex flex-col overflow-hidden'>
      <div className='text-center mb-4'>
        <h3
          className='text-xl font-semibold text-gray-900 mb-2'
          style={{ fontFamily: "Arial" }}
        >
          Remplissez vos informations
        </h3>
        <p className='text-gray-600 text-sm' style={{ fontFamily: "Arial" }}>
          Nous vous contacterons pour confirmer votre commande
        </p>
      </div>

      <div className='flex-1 space-y-4 overflow-hidden'>
        {/* Name and Phone Fields - Flex Layout */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* Name Field */}
          <div className='space-y-1'>
            <Label
              htmlFor='name'
              className='text-sm font-medium text-gray-700 flex items-center'
            >
              <User className='h-4 w-4 mr-2 text-red-600' />
              Nom *
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
              placeholder='Votre nom'
            />
            {errors.name && (
              <p className='text-xs text-red-500'>{errors.name}</p>
            )}
          </div>

          {/* Phone Field */}
          <div className='space-y-1'>
            <Label
              htmlFor='phone'
              className='text-sm font-medium text-gray-700 flex items-center'
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
              placeholder='+374 XX XXX XXX'
            />
            {errors.phone && (
              <p className='text-xs text-red-500'>{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Address Field - Reduced Height */}
        <div className='space-y-1'>
          <Label
            htmlFor='address'
            className='text-sm font-medium text-gray-700 flex items-center'
          >
            <MapPin className='h-4 w-4 mr-2 text-red-600' />
            Adresse *
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
            placeholder='Votre adresse (rue, numéro, appartement)'
          />
          {errors.address && (
            <p className='text-xs text-red-500'>{errors.address}</p>
          )}
        </div>

        {/* Notes Field - Reduced Height */}
        <div className='space-y-1'>
          <Label
            htmlFor='notes'
            className='text-sm font-medium text-gray-700 flex items-center'
          >
            <MessageSquare className='h-4 w-4 mr-2 text-red-600' />
            Notes supplémentaires
          </Label>
          <Textarea
            id='notes'
            name='notes'
            rows={2}
            value={customerInfo.notes}
            onChange={handleInputChange}
            className='focus:border-red-600 transition-all duration-200 resize-none'
            placeholder='Toute information supplémentaire...'
          />
        </div>
      </div>

      {/* Action Buttons - Fixed at bottom */}
      <div className='flex gap-4 pt-4 mt-4 border-t border-gray-100'>
        <Button
          variant='outline'
          onClick={onPrev}
          className='flex-1 border-gray-300 hover:bg-gray-50 transition-all duration-200 bg-transparent'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Retour
        </Button>
        <Button
          onClick={handleNext}
          className='flex-1 bg-red-600 hover:bg-red-700 text-white transition-all duration-300 transform'
        >
          <span>Suivant</span>
          <ArrowRight className='ml-2 h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
