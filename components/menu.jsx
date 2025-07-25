"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Eye,
  Plus,
  Minus,
  Loader2,
  AlertCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qvancfxisnlcqhqwluht.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2YW5jZnhpc25sY3FocXdsdWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NTA2NzUsImV4cCI6MjA2OTAyNjY3NX0.ffGDFayfuJX7p7Q1yHqh3ICxIual_3V6SyNbHFZSTSk";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// localStorage functions - ADDED
const saveCartToLocalStorage = (cartItems) => {
  try {
    localStorage.setItem("restaurant-cart", JSON.stringify(cartItems));
    console.log("Cart saved to localStorage:", cartItems);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const getCartFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem("restaurant-cart");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return [];
  }
};

export default function Menu() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [itemsToShow, setItemsToShow] = useState(12);
  const ITEMS_PER_PAGE = 12;
  const { addItem, updateQuantity, removeItem, items } = useCart();

  // State for Supabase data
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesMap, setCategoriesMap] = useState({}); // Map category_id to category name
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMenuData() {
      try {
        setLoading(true);
        console.log("Fetching menu data from Supabase...");
        // Fetch products and categories in parallel
        const [productsResponse, categoriesResponse] = await Promise.all([
          supabase.from("products").select("*").order("name"),
          supabase.from("categories").select("*").order("name")
        ]);

        // Handle categories first
        if (categoriesResponse.error) {
          console.error("Categories error:", categoriesResponse.error);
          setError(`Categories: ${categoriesResponse.error.message}`);
          return;
        }

        // Handle products
        if (productsResponse.error) {
          console.error("Products error:", productsResponse.error);
          setError(`Products: ${productsResponse.error.message}`);
          return;
        }

        console.log("Products from Supabase:", productsResponse.data);
        console.log("Categories from Supabase:", categoriesResponse.data);

        // Create categories map for quick lookup
        const catMap = {};
        const categoryNames = ["Tout"];
        if (categoriesResponse.data) {
          categoriesResponse.data.forEach((cat) => {
            catMap[cat.id] = cat.name;
            categoryNames.push(cat.name);
          });
        }

        // Set the data
        setMenuItems(productsResponse.data || []);
        setCategories(categoryNames);
        setCategoriesMap(catMap);
      } catch (err) {
        console.error("Error in fetchMenuData:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMenuData();
  }, []);

  // Load cart from localStorage on component mount - ADDED
  useEffect(() => {
    const savedCart = getCartFromLocalStorage();
    if (savedCart && savedCart.length > 0) {
      console.log("Loading cart from localStorage:", savedCart);
      savedCart.forEach((savedItem) => {
        // Check if item already exists in current cart to avoid duplicates
        const existingItem = items.find((item) => item.id === savedItem.id);
        if (!existingItem) {
          addItem(savedItem);
        }
      });
    }
  }, [addItem, items]);

  // Helper function to get category name by ID
  const getCategoryName = (categoryId) => {
    return categoriesMap[categoryId] || "Catégorie inconnue";
  };

  // Filter menuItems based on activeCategory and limit items shown
  const filteredItems = useMemo(() => {
    let filtered;
    if (activeCategory === "Tout") {
      filtered = menuItems;
    } else {
      // Filter by matching category_id to category name
      filtered = menuItems.filter((item) => {
        const categoryName = getCategoryName(item.category_id);
        return categoryName === activeCategory;
      });
    }
    return filtered.slice(0, itemsToShow);
  }, [menuItems, activeCategory, itemsToShow, categoriesMap]);

  // Get total count for current category
  const totalItemsInCategory = useMemo(() => {
    if (activeCategory === "Tout") {
      return menuItems.length;
    }
    return menuItems.filter((item) => {
      const categoryName = getCategoryName(item.category_id);
      return categoryName === activeCategory;
    }).length;
  }, [menuItems, activeCategory, categoriesMap]);

  const getItemQuantityInCart = (itemId) => {
    const cartItem = items.find((item) => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleUpdateCartItemQuantity = (productId, change) => {
    const currentQuantity = getItemQuantityInCart(productId);
    const newQuantity = currentQuantity + change;

    if (newQuantity <= 0) {
      if (currentQuantity > 0) {
        removeItem(productId);
        const item = menuItems.find((item) => item.id === productId);
        if (item) {
          toast.success(`${item.name} retiré du panier`);
        }
      }
    } else if (currentQuantity === 0) {
      // Add new item
      const item = menuItems.find((item) => item.id === productId);
      if (item) {
        addItem({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image_url,
          quantity: 1
        });
        toast.success(`${item.name} ajouté au panier`);
      }
    } else {
      // Update existing item
      updateQuantity(productId, newQuantity);
    }

    // Save updated cart to localStorage after a short delay to ensure state is updated - ADDED
    setTimeout(() => {
      saveCartToLocalStorage(items);
    }, 100);
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <section id='menu' className='w-full py-12 md:py-24 lg:py-32 bg-gray-50'>
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      <div className='container px-4 md:px-6 max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-16'>
          <div className='inline-block mb-3'>
            <div className='flex items-center justify-center gap-2'>
              <span className='h-1 w-10 bg-red-600 rounded-full'></span>
              <span className='text-red-600 font-medium uppercase tracking-wider text-sm'>
                NOTRE MENU
              </span>
              <span className='h-1 w-10 bg-red-600 rounded-full'></span>
            </div>
          </div>
          <h2
            className='text-3xl lg:text-4xl font-bold text-gray-900 mb-4'
            style={{ fontFamily: "Arial" }}
          >
            Notre <span className='text-[#DC2626]'>Menu</span>
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Découvrez notre carte complète avec des plats authentiques préparés
            avec passion
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className='flex flex-col items-center justify-center py-12'>
            <Loader2 className='h-12 w-12 text-red-600 animate-spin mb-4' />
            <p
              className='text-lg text-gray-600'
              style={{ fontFamily: "Arial" }}
            >
              Chargement du menu depuis la base de données...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className='flex flex-col items-center justify-center py-12 text-center'>
            <div className='bg-red-100 text-red-700 p-6 rounded-lg max-w-md border border-red-200'>
              <AlertCircle className='h-12 w-12 text-red-600 mx-auto mb-4' />
              <p className='font-semibold mb-2' style={{ fontFamily: "Arial" }}>
                Erreur de chargement du menu
              </p>
              <p className='text-sm mb-4'>{error}</p>
              <Button
                className='bg-red-600 hover:bg-red-700 text-white'
                onClick={() => window.location.reload()}
                style={{ fontFamily: "Arial" }}
              >
                Réessayer
              </Button>
            </div>
          </div>
        )}

        {/* Menu Content - Only show when not loading and no error */}
        {!loading && !error && (
          <>
            {/* Filter Tags */}
            <div className='flex flex-wrap justify-center gap-1 sm:gap-2 mb-8 sm:mb-12'>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant='outline'
                  onClick={() => {
                    setActiveCategory(category);
                    setItemsToShow(ITEMS_PER_PAGE);
                  }}
                  className={cn(
                    "rounded-full px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm transition-colors border-red-600",
                    activeCategory === category
                      ? "bg-red-600 text-white hover:bg-red-700 hover:text-white"
                      : "bg-white text-red-600 hover:bg-red-50 hover:text-red-600"
                  )}
                  style={{ fontFamily: "Arial" }}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* No Items State */}
            {filteredItems.length === 0 && (
              <div className='text-center py-12'>
                <p
                  className='text-lg text-gray-600'
                  style={{ fontFamily: "Arial" }}
                >
                  Aucun produit trouvé dans cette catégorie.
                </p>
              </div>
            )}

            {/* Menu Grid */}
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6'>
              {filteredItems.map((product, index) => {
                const quantity = getItemQuantityInCart(product.id);
                const categoryName = getCategoryName(product.category_id);
                return (
                  <Card
                    key={product.id}
                    className={`flex flex-col justify-between overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform animate-fade-in-up`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationFillMode: "both"
                    }}
                  >
                    {/* 3/2 aspect ratio image container */}
                    <div className='relative w-full aspect-[3/2] bg-gray-100 overflow-hidden'>
                      <Image
                        src={
                          product.image_url ||
                          "/placeholder.svg?height=200&width=300" ||
                          "/placeholder.svg" ||
                          "/placeholder.svg"
                        }
                        alt={product.name}
                        fill
                        className='object-cover transition-transform duration-300 hover:scale-105'
                      />
                      {/* Price overlay - bottom right corner */}
                      <div className='absolute bottom-2 right-2 bg-red-600 text-white px-2 py-1 rounded-lg shadow-lg'>
                        <p
                          className='text-sm font-bold'
                          style={{ fontFamily: "Arial" }}
                        >
                          {product.price
                            ? `${product.price.toFixed(2)}€`
                            : "Prix sur demande"}
                        </p>
                      </div>
                      {/* Category badge - top left corner */}
                      <div className='absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded-lg text-xs'>
                        {categoryName}
                      </div>
                    </div>
                    <CardContent className='p-2 sm:p-4'>
                      <CardTitle
                        className='text-sm sm:text-xl font-semibold mb-1 sm:mb-2 line-clamp-2'
                        style={{ fontFamily: "Arial" }}
                      >
                        {product.name}
                      </CardTitle>
                      <CardDescription className='text-xs sm:text-sm text-muted-foreground hidden sm:block'>
                        {product.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className='flex flex-col gap-1 sm:gap-2 p-2 sm:p-4 pt-1'>
                      {quantity === 0 ? (
                        <Button
                          className='w-full bg-red-600 hover:bg-red-700 text-white h-8 sm:h-10 text-xs sm:text-sm'
                          onClick={() =>
                            handleUpdateCartItemQuantity(product.id, 1)
                          }
                          disabled={!product.price}
                          style={{ fontFamily: "Arial" }}
                        >
                          <ShoppingCart className='h-3 w-3 sm:h-4 sm:w-4 sm:mr-2' />
                          <span className='hidden sm:inline'>
                            {!product.price
                              ? "Prix sur demande"
                              : "Ajouter au panier"}
                          </span>
                        </Button>
                      ) : (
                        <div className='flex items-center justify-between w-full gap-1 sm:gap-2'>
                          <Button
                            variant='outline'
                            size='icon'
                            onClick={() =>
                              handleUpdateCartItemQuantity(product.id, -1)
                            }
                            className='h-8 w-8 sm:h-10 sm:w-10'
                          >
                            <Minus className='h-3 w-3 sm:h-4 sm:w-4' />
                          </Button>
                          <span className='text-sm sm:text-lg font-semibold flex-1 text-center'>
                            {quantity}
                          </span>
                          <Button
                            variant='outline'
                            size='icon'
                            onClick={() =>
                              handleUpdateCartItemQuantity(product.id, 1)
                            }
                            className='h-8 w-8 sm:h-10 sm:w-10'
                          >
                            <Plus className='h-3 w-3 sm:h-4 sm:w-4' />
                          </Button>
                        </div>
                      )}
                      <Dialog
                        open={isModalOpen && selectedProduct?.id === product.id}
                        onOpenChange={setIsModalOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant='outline'
                            className='w-full bg-red-50 text-red-600 h-8 sm:h-10 text-xs sm:text-sm hover:bg-red-600/20 hover:text-red-600 border-0'
                            onClick={() => handleQuickView(product)}
                            style={{ fontFamily: "Arial" }}
                          >
                            <Eye className='h-3 w-3 sm:h-4 sm:w-4 sm:mr-2' />
                            <span className='hidden sm:inline'>
                              Aperçu rapide
                            </span>
                            <span className='sm:hidden'>Voir</span>
                          </Button>
                        </DialogTrigger>
                        {selectedProduct && (
                          <DialogContent className='w-[95vw] max-w-[500px] max-h-[90vh] p-4 sm:p-6'>
                            <DialogHeader>
                              <DialogTitle
                                className='text-xl sm:text-3xl font-bold'
                                style={{ fontFamily: "Arial" }}
                              >
                                {selectedProduct.name}
                              </DialogTitle>
                              <DialogDescription>
                                Catégorie:{" "}
                                {getCategoryName(selectedProduct.category_id)}
                              </DialogDescription>
                            </DialogHeader>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4'>
                              <div className='relative w-full h-48 sm:h-64 rounded-lg overflow-hidden'>
                                <Image
                                  src={
                                    selectedProduct.image_url ||
                                    "/placeholder.svg?height=300&width=300" ||
                                    "/placeholder.svg" ||
                                    "/placeholder.svg"
                                  }
                                  alt={selectedProduct.name}
                                  fill
                                  className='object-cover'
                                />
                              </div>
                              <div className='flex flex-col justify-between'>
                                <div className='space-y-3 sm:space-y-4'>
                                  <p
                                    className='text-xl sm:text-2xl font-bold text-gray-900'
                                    style={{ fontFamily: "Arial" }}
                                  >
                                    {selectedProduct.price
                                      ? `${selectedProduct.price.toFixed(2)}€`
                                      : "Prix sur demande"}
                                  </p>
                                  <p className='text-sm sm:text-base text-muted-foreground'>
                                    {selectedProduct.description}
                                  </p>
                                  {selectedProduct.composition && (
                                    <div>
                                      <h4 className='font-semibold mb-1'>
                                        Composition:
                                      </h4>
                                      <p className='text-sm text-muted-foreground'>
                                        {selectedProduct.composition}
                                      </p>
                                    </div>
                                  )}
                                </div>
                                {/* Add to cart button in modal */}
                                {quantity === 0 ? (
                                  <Button
                                    className='w-full mt-4 sm:mt-6 bg-red-600 hover:bg-red-700 text-white'
                                    onClick={() =>
                                      handleUpdateCartItemQuantity(
                                        product.id,
                                        1
                                      )
                                    }
                                    disabled={!selectedProduct.price}
                                    style={{ fontFamily: "Arial" }}
                                  >
                                    <ShoppingCart className='mr-2 h-4 w-4' />
                                    {!selectedProduct.price
                                      ? "Prix sur demande"
                                      : "Ajouter au panier"}
                                  </Button>
                                ) : (
                                  <div className='flex items-center justify-between w-full gap-2 mt-4 sm:mt-6'>
                                    <Button
                                      variant='outline'
                                      size='icon'
                                      onClick={() =>
                                        handleUpdateCartItemQuantity(
                                          product.id,
                                          -1
                                        )
                                      }
                                      className='h-10 w-10'
                                    >
                                      <Minus className='h-4 w-4' />
                                    </Button>
                                    <span className='text-lg font-semibold flex-1 text-center'>
                                      {quantity}
                                    </span>
                                    <Button
                                      variant='outline'
                                      size='icon'
                                      onClick={() =>
                                        handleUpdateCartItemQuantity(
                                          product.id,
                                          1
                                        )
                                      }
                                      className='h-10 w-10'
                                    >
                                      <Plus className='h-4 w-4' />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        )}
                      </Dialog>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>

            {/* Show More Button */}
            {itemsToShow < totalItemsInCategory && (
              <div className='flex justify-center mt-8'>
                <Button
                  onClick={() =>
                    setItemsToShow((prev) => prev + ITEMS_PER_PAGE)
                  }
                  className='bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg'
                  style={{ fontFamily: "Arial" }}
                >
                  Voir plus ({totalItemsInCategory - itemsToShow} restants)
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
