"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const useHeroSlides = () => {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log("Fetching hero slides from Supabase...");

      const { data, error } = await supabase
        .from("hero_slides")
        .select("*")
        .order("slide_order", { ascending: true });

      if (error) {
        console.error("Hero slides error:", error);
        throw error;
      }

      setSlides(data || []);
    } catch (err) {
      console.error("Error fetching hero slides:", err);
      setError("Failed to load hero slides");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    slides,
    isLoading,
    error,
    refetch: fetchSlides
  };
};
