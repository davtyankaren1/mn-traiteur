"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function SelectionModal({
  isOpen,
  onClose,
  options,
  title,
  description,
  onSelect
}) {
  const [selectedValue, setSelectedValue] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

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
        setSelectedValue(""); // Reset selected value when closing
      }, 400);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleConfirm = () => {
    if (selectedValue) {
      onSelect(selectedValue);
      onClose();
    }
  };

  if (!shouldRender) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle
            className='text-xl font-bold text-gray-900'
            style={{ fontFamily: "Arial" }}
          >
            {title}
          </DialogTitle>
          <DialogDescription className='text-gray-600 text-sm'>
            {description}
          </DialogDescription>
        </DialogHeader>
        <RadioGroup
          onValueChange={setSelectedValue}
          value={selectedValue}
          className='grid gap-3 py-4'
        >
          {options.map((option) => (
            <Label
              key={option}
              htmlFor={option}
              className='flex items-center justify-between rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-red-50 hover:border-red-600 cursor-pointer transition-all duration-200'
            >
              <div className='flex items-center space-x-2'>
                <RadioGroupItem
                  value={option}
                  id={option}
                  className='text-red-600 border-red-600'
                />
                <span className='text-base font-medium text-gray-800'>
                  {option}
                </span>
              </div>
              {selectedValue === option && (
                <CheckCircle className='h-5 w-5 text-red-600' />
              )}
            </Label>
          ))}
        </RadioGroup>
        <Button
          onClick={handleConfirm}
          disabled={!selectedValue}
          className='w-full bg-red-600 hover:bg-red-700 text-white py-2 text-lg font-semibold transition-all duration-300 transform'
          style={{ fontFamily: "Arial" }}
        >
          Confirmer
        </Button>
      </DialogContent>
    </Dialog>
  );
}
