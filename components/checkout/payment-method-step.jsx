"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Label } from "../components/ui/label"
import { CreditCard, Banknote, ArrowLeft, CheckCircle, User, Phone, MapPin } from "lucide-react"
import { useCart } from "../contexts/cart-context"
import { toast } from "sonner"
import type { CustomerInfo } from "../components/checkout-modal"

interface PaymentMethodStepProps {
  customerInfo: CustomerInfo
  paymentMethod: string
  onPaymentMethodChange: (method: string) => void
  onPrev: () => void
  onSubmit: () => void
}

export default function PaymentMethodStep({
  customerInfo,
  paymentMethod,
  onPaymentMethodChange,
  onPrev,
  onSubmit,
}: PaymentMethodStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { items, getTotalPrice } = useCart()
  const deliveryFee = 500
  const totalWithDelivery = getTotalPrice() + (items.length > 0 ? deliveryFee : 0)

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate order processing
    setTimeout(() => {
      toast.success("Ձեր պատվերը հաջողությամբ ընդունվել է! Մենք կապ կհաստատվենք ձեզ հետ շուտով:")
      setIsSubmitting(false)
      onSubmit()
    }, 2000)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Customer Info Summary */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <h3 className="font-semibold text-gray-900 mb-3" style={{ fontFamily: "Arial" }}>
          Vos informations
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">{customerInfo.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">{customerInfo.phone}</span>
          </div>
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
            <span className="text-gray-700">{customerInfo.address}</span>
          </div>
          {customerInfo.notes && (
            <div className="flex items-start space-x-2">
              <span className="text-xs text-gray-500 font-medium">Notes:</span>
              <span className="text-gray-700 text-xs">{customerInfo.notes}</span>
            </div>
          )}
        </div>
      </div>

      {/* Order Total */}
      <div className="bg-red-50 rounded-lg p-4 space-y-2">
        <h3 className="font-semibold text-gray-900 mb-3" style={{ fontFamily: "Arial" }}>
          Montant final
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Plats ({items.length} types)</span>
            <span>{getTotalPrice()}֏</span>
          </div>
          <div className="flex justify-between">
            <span>Livraison</span>
            <span>{deliveryFee}֏</span>
          </div>
          <div className="border-t border-red-200 pt-2 mt-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-red-600">{totalWithDelivery}֏</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 text-lg" style={{ fontFamily: "Arial" }}>
          Choisissez le mode de paiement
        </h3>

        <RadioGroup value={paymentMethod} onValueChange={onPaymentMethodChange}>
          <div className="grid grid-cols-2 gap-4">
            {/* Cash Payment */}
            <div
              className={`flex items-center space-x-4 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 h-20 ${
                paymentMethod === "cash" ? "border-green-500 bg-green-50" : "border-gray-200"
              }`}
            >
              <RadioGroupItem value="cash" id="cash" />
              <Label htmlFor="cash" className="flex items-center space-x-4 cursor-pointer flex-1">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ${
                    paymentMethod === "cash" ? "bg-green-500" : "bg-green-100"
                  }`}
                >
                  <Banknote className={`h-6 w-6 ${paymentMethod === "cash" ? "text-white" : "text-green-600"}`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Espèces</div>
                </div>
                {paymentMethod === "cash" && <CheckCircle className="h-5 w-5 text-green-500" />}
              </Label>
            </div>

            {/* Card Payment */}
            <div
              className={`flex items-center space-x-4 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 h-20 ${
                paymentMethod === "card" ? "border-blue-500 bg-blue-50" : "border-gray-200"
              }`}
            >
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center space-x-4 cursor-pointer flex-1">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ${
                    paymentMethod === "card" ? "bg-blue-500" : "bg-blue-100"
                  }`}
                >
                  <CreditCard className={`h-6 w-6 ${paymentMethod === "card" ? "text-white" : "text-blue-600"}`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Paiement par carte</div>
                </div>
                {paymentMethod === "card" && <CheckCircle className="h-5 w-5 text-blue-500" />}
              </Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={isSubmitting}
          className="flex-1 border-gray-300 hover:bg-gray-50 transition-all duration-200 bg-transparent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
        >
          {isSubmitting ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Traitement en cours...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Confirmer la commande</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  )
}
