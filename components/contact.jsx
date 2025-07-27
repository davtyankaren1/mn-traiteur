"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendToTelegram = () => {
    const message = `📞 NOUVEAU MESSAGE DE CONTACT

👤 Nom: ${formData.name}
📧 Email: ${formData.email}
${formData.phone ? `📱 Téléphone: ${formData.phone}` : ""}

💬 Message:
${formData.message}

---
📅 Reçu le: ${new Date().toLocaleString("fr-FR")}
🌐 Source: Site web M.N. Traiteur`;

    const url = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TG_BOT_TOKEN}/sendMessage`;

    return axios.post(url, {
      chat_id: process.env.NEXT_PUBLIC_TG_CHAT_ID,
      text: message
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendToTelegram();
      toast.success(
        "Votre message a été envoyé avec succès ! Nous vous contacterons bientôt."
      );
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      toast.error("Erreur lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id='contact' className='py-16 lg:py-24 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* New Header Style */}
        <div className='text-center mb-16'>
          <div className='inline-block mb-3'>
            <div className='flex items-center justify-center gap-2'>
              <span className='h-1 w-10 bg-red-600 rounded-full'></span>
              <span className='text-red-600 font-medium uppercase tracking-wider text-sm'>
                CONTACT
              </span>
              <span className='h-1 w-10 bg-red-600 rounded-full'></span>
            </div>
          </div>
          <h2
            className='text-3xl lg:text-4xl font-bold text-gray-900 mb-4'
            style={{ fontFamily: "Arial" }}
          >
            Contactez <span className='text-[#DC2626]'>Nous</span>
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Vous avez des questions ou des suggestions ? Nous sommes toujours
            prêts à vous aider
          </p>
        </div>
        <div className='grid lg:grid-cols-2 gap-12'>
          {/* Contact Form - Now on the LEFT */}
          <Card className='shadow-xl border-0 bg-white'>
            <CardHeader>
              <CardTitle
                className='text-2xl text-gray-900'
                style={{ fontFamily: "Arial" }}
              >
                Écrivez-nous
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid md:grid-cols-2 gap-4'>
                  <div>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Nom *
                    </label>
                    <Input
                      id='name'
                      name='name'
                      type='text'
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className='border-gray-300 focus:border-red-600 focus:ring-red-600'
                      placeholder='Votre nom'
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='phone'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Téléphone
                    </label>
                    <Input
                      id='phone'
                      name='phone'
                      type='tel'
                      value={formData.phone}
                      onChange={handleChange}
                      className='border-gray-300 focus:border-red-600 focus:ring-red-600'
                      placeholder='+33 X XX XX XX XX'
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Email *
                  </label>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className='border-gray-300 focus:border-red-600 focus:ring-red-600'
                    placeholder='votre@email.com'
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label
                    htmlFor='message'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Message *
                  </label>
                  <Textarea
                    id='message'
                    name='message'
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className='border-gray-300 focus:border-red-600 focus:ring-red-600'
                    placeholder='Votre message...'
                    disabled={isSubmitting}
                  />
                </div>
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-red-50 hover:bg-red-700 text-red-600 py-3 text-lg font-semibold hover:text-white transition-all duration-300 border border-red-200 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                </Button>
              </form>
            </CardContent>
          </Card>
          {/* Contact Information - Now on the RIGHT with Image at TOP */}
          <div className='space-y-8'>
            {/* Restaurant Team Image at the TOP */}
            <Card className='overflow-hidden shadow-lg border-0'>
              <div className='h-64 relative'>
                <Image
                  src='/logo-bg.jpg'
                  alt='Équipe M.N. Traiteur - Notre équipe professionnelle'
                  fill
                  className='object-cover hover:scale-105 transition-transform duration-300'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
                <div className='absolute bottom-4 left-4 bg-red-600/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg'>
                  <p
                    className='text-sm font-semibold'
                    style={{ fontFamily: "Arial" }}
                  >
                    Notre équipe professionnelle M.N. Traiteur
                  </p>
                </div>
              </div>
            </Card>
            {/* Contact Information at the BOTTOM - Mobile Optimized */}
            <div>
              <h3
                className='text-2xl font-bold text-gray-900 mb-6'
                style={{ fontFamily: "Arial" }}
              >
                Informations de Contact
              </h3>
              {/* Mobile: Stack vertically, Desktop: 2x2 Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
                {/* Address */}
                <div className='flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border border-red-100'>
                  <div className='w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0'>
                    <MapPin className='w-5 h-5 text-white' />
                  </div>
                  <div className='flex-1'>
                    <h4 className='font-semibold text-gray-900 text-sm md:text-base'>
                      Adresse
                    </h4>
                    <p className='text-gray-600 text-sm'>
                      19 rue Forlen 67118 Geispolsheim
                    </p>
                  </div>
                </div>
                {/* Phone */}
                <div className='flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border border-red-100'>
                  <div className='w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0'>
                    <Phone className='w-5 h-5 text-white' />
                  </div>
                  <div className='flex-1'>
                    <h4 className='font-semibold text-gray-900 text-sm md:text-base'>
                      Téléphone
                    </h4>
                    <p className='text-gray-600 text-sm'>+33 6 12 53 43 76</p>
                  </div>
                </div>
                {/* Email */}
                <div className='flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border border-red-100'>
                  <div className='w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0'>
                    <Mail className='w-5 h-5 text-white' />
                  </div>
                  <div className='flex-1'>
                    <h4 className='font-semibold text-gray-900 text-sm md:text-base'>
                      Email
                    </h4>
                    <p className='text-gray-600 text-sm'>info@mn-traiteur.fr</p>
                  </div>
                </div>
                {/* Working Hours */}
                <div className='flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border border-red-100'>
                  <div className='w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0'>
                    <Clock className='w-5 h-5 text-white' />
                  </div>
                  <div className='flex-1'>
                    <h4 className='font-semibold text-gray-900 text-sm md:text-base'>
                      Horaires
                    </h4>
                    <p className='text-gray-600 text-sm'>
                      Monday - Fermé <br />
                      Tuesday-Sunday: 11h30 - 14h30 et 18h - 21h45
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
