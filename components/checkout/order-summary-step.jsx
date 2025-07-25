"use client"

import { Button } from "../components/ui/button"
import { useCart } from "../contexts/cart-context"
import { ShoppingBag, ArrowRight } from "lucide-react"

interface OrderSummaryStepProps {
  onNext: () => void
  onClose: () => void
}

export default function OrderSummaryStep({ onNext, onClose }: OrderSummaryStepProps) {
  const { items, getTotalPrice } = useCart()
  const deliveryFee = 500
  const totalWithDelivery = getTotalPrice() + (items.length > 0 ? deliveryFee : 0)

  return (
    <div className="p-6 space-y-6">
      {/* Order Items */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 mb-4">
          <ShoppingBag className="h-6 w-6 text-red-600" />
          <h3 className="text-xl font-semibold text-gray-900" style={{ fontFamily: "Arial" }}>
            Vos plats commandés
          </h3>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500" style={{ fontFamily: "Arial" }}>
              Le panier est vide
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900" style={{ fontFamily: "Arial" }}>
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {item.price}֏ × {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{item.price * item.quantity}֏</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Total */}
      {items.length > 0 && (
        <div className="bg-red-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span style={{ fontFamily: "Arial" }}>Sous-total</span>
            <span>{getTotalPrice()}֏</span>
          </div>
          <div className="flex justify-between text-sm">
            <span style={{ fontFamily: "Arial" }}>Livraison</span>
            <span>{deliveryFee}֏</span>
          </div>
          <div className="border-t border-red-200 pt-2">
            <div className="flex justify-between font-bold text-lg">
              <span style={{ fontFamily: "Arial" }}>Total</span>
              <span className="text-red-600">{totalWithDelivery}֏</span>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <Button variant="outline" onClick={onClose} className="flex-1 border-gray-300 hover:bg-gray-50 bg-transparent">
          Continuer les achats
        </Button>
        <Button
          onClick={onNext}
          disabled={items.length === 0}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white transition-all duration-300 transform hover:scale-105"
        >
          <span>Suivant</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
