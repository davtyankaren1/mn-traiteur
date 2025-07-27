"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qvancfxisnlcqhqwluht.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2YW5jZnhpc25sY3FocXdsdWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NTA2NzUsImV4cCI6MjA2OTAyNjY3NX0.ffGDFayfuJX7p7Q1yHqh3ICxIual_3V6SyNbHFZSTSk";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

      console.log("Hero slides from Supabase:", data);
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
