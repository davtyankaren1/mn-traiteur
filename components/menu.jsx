"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ShoppingCart, Eye, Plus, Minus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../components/ui/dialog";
import { cn } from "@/lib/utils";
import { useCart } from "../contexts/cart-context";
import { toast } from "sonner";

const menuItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export default function Menu() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Tout");
  const { addItem, updateQuantity, removeItem, items } = useCart();

  // Real menu items from the restaurant
  const menuItems = [
    // BURGERS + FRITES
    {
      id: "burger1",
      name: "Hamburger",
      description: "Steak haché, salade, tomate, oignon, cornichon, sauce",
      price: 11.5,
      image: "/menu/burgers/classic-hamburger.jpg",
      category: "Burgers + Frites",
      fullDescription:
        "Hamburger classique avec steak haché grillé, salade fraîche, tomate, oignon, cornichon et sauce maison. Servi avec frites."
    },
    {
      id: "burger2",
      name: "Cheeseburger",
      description: "Steak haché, salade, tomate, oignon, cornichon, sauce",
      price: 11.9,
      image: "/menu/burgers/cheesburger.jpg",
      category: "Burgers + Frites",
      fullDescription:
        "Cheeseburger avec steak haché, fromage fondu, salade, tomate, oignon, cornichon et sauce. Servi avec frites."
    },
    {
      id: "burger3",
      name: "Crispy Burger",
      description:
        "Poulet pané, galette de pomme de terre, tranche de cheddar, sauce",
      price: 11.9,
      image: "/menu/burgers/cripsy-burger.jpg",
      category: "Burgers + Frites",
      fullDescription:
        "Burger croustillant avec poulet pané, galette de pomme de terre, cheddar et sauce spéciale. Servi avec frites."
    },
    {
      id: "burger4",
      name: "Hamburger Bacon",
      description:
        "Steak haché, bacon, salade, tomate, oignon, cornichon, sauce",
      price: 12.9,
      image: "/menu/burgers/bacon-burger.png",
      category: "Burgers + Frites",
      fullDescription:
        "Hamburger généreux avec steak haché, bacon croustillant, salade, tomate, oignon, cornichon et sauce. Servi avec frites."
    },
    {
      id: "burger5",
      name: "Chili Cheeseburger",
      description:
        "Steak haché, salade, tomate, oignon, cornichons, piment vert, sauce cheddar",
      price: 12.9,
      image: "/menu/burgers/chili-cheesburger.jpg",
      category: "Burgers + Frites",
      fullDescription:
        "Burger épicé avec steak haché, salade, tomate, oignon, cornichons, piment vert et sauce cheddar. Servi avec frites."
    },

    // PASTAS
    {
      id: "pasta1",
      name: "Pâtes aux Tomates",
      description: "Spaghettis ou pennes, sauce tomate, ail",
      price: 7.9,
      image: "/menu/pasta-tomato-fusilli.png",
      category: "Pastas",
      fullDescription:
        "Pâtes fraîches au choix (spaghettis ou pennes) avec sauce tomate maison et ail."
    },
    {
      id: "pasta2",
      name: "Pasta à la Bolognaise",
      description: "Sauce tomate, carottes, bœuf haché (Halal)",
      price: 9.9,
      image: "/menu/spaghetti-bolognaise.png",
      category: "Pastas",
      fullDescription:
        "Pâtes avec sauce bolognaise traditionnelle, carottes et bœuf haché halal mijoté lentement."
    },
    {
      id: "pasta3",
      name: "Pasta aux Légumes",
      description: "Brocolis, petit pois, champignons, sauce tomate, crème",
      price: 9.9,
      image: "/menu/vagetables-pasta.jpg",
      category: "Pastas",
      fullDescription:
        "Pâtes aux légumes frais : brocolis, petits pois, champignons avec sauce tomate crémeuse."
    },
    {
      id: "pasta4",
      name: "Carbonara",
      description: "Lardons, parmesan, crème",
      price: 9.9,
      image: "/menu/pasta-carbonara.png",
      category: "Pastas",
      fullDescription:
        "Pâtes carbonara traditionnelles avec lardons, parmesan et crème fraîche."
    },
    {
      id: "pasta5",
      name: "Aux Épinards",
      description: "Épinard, ail, filet de poulet (Halal)",
      price: 9.9,
      image: "/menu/pasta-pesto-spinach.png",
      category: "Pastas",
      fullDescription:
        "Pâtes aux épinards frais, ail et filet de poulet halal grillé."
    },

    // ASSIETTES (PLATES)
    {
      id: "plate1",
      name: "Escalope Milanaise",
      description: "Viande grillée au charbon de bois",
      price: 19.9,
      image: "/menu/escalope-milanaise.png",
      category: "Assiettes",
      fullDescription:
        "Escalope milanaise grillée au charbon de bois, servie avec accompagnements."
    },
    {
      id: "plate2",
      name: "Cordon Bleu",
      description: "Sauce champignon",
      price: 14.9,
      image: "/menu/cordon-bleu.png",
      category: "Assiettes",
      fullDescription:
        "Cordon bleu maison avec sauce aux champignons, servi avec accompagnements."
    },
    {
      id: "plate3",
      name: "Brochette de Poulet Haché",
      description: "Brochette de poulet haché grillée",
      price: 11.9,
      image: "/menu/chicken-skewers.jpeg",
      category: "Assiettes",
      fullDescription:
        "Brochette de poulet haché aux épices, grillée au charbon de bois."
    },
    {
      id: "plate4",
      name: "Brochette de Bœuf Haché",
      description: "Brochette de bœuf haché grillée",
      price: 11.9,
      image: "/menu/beef-kebabs.png",
      category: "Assiettes",
      fullDescription:
        "Brochette de bœuf haché aux épices, grillée au charbon de bois."
    },
    {
      id: "plate5",
      name: "Pilon de Poulet",
      description: "Pilon de poulet grillé",
      price: 11.9,
      image: "/menu/chicken-drumsticks.png",
      category: "Assiettes",
      fullDescription: "Pilon de poulet mariné et grillé au charbon de bois."
    },
    {
      id: "plate6",
      name: "Côtelettes d'Agneau (3x)",
      description: "Trois côtelettes d'agneau grillées",
      price: 15.5,
      image: "/menu/lamb-chops.png",
      category: "Assiettes",
      fullDescription:
        "Trois côtelettes d'agneau tendres, grillées au charbon de bois."
    },
    {
      id: "plate7",
      name: "Saumon Pavés (1x)",
      description: "Pavé de saumon grillé",
      price: 15.5,
      image: "/menu/salmon-steaks.png",
      category: "Assiettes",
      fullDescription:
        "Pavé de saumon frais grillé, servi avec accompagnements."
    },

    // FRITURES
    {
      id: "frit1",
      name: "Nuggets Maison (5x)",
      description: "Nuggets de poulet faits maison",
      price: 6.5,
      image: "/menu/nuggets-maison.png",
      category: "Fritures",
      fullDescription: "Cinq nuggets de poulet faits maison, panés et frits."
    },
    {
      id: "frit2",
      name: "Cuisse de Poulet Panée",
      description: "Cuisse de poulet désossée panée (maison)",
      price: 6.5,
      image: "/placeholder.svg?height=300&width=400&text=Cuisse+Panée",
      category: "Fritures",
      fullDescription: "Cuisse de poulet désossée, panée maison et frite."
    },
    {
      id: "frit3",
      name: "Calamar Rings (5x)",
      description: "Anneaux de calamar frits",
      price: 6.5,
      image: "/placeholder.svg?height=300&width=400&text=Calamar+Rings",
      category: "Fritures",
      fullDescription:
        "Cinq anneaux de calamar panés et frits, servis avec sauce."
    },
    {
      id: "frit4",
      name: "Oignon Rings (5x)",
      description: "Anneaux d'oignon frits",
      price: 5.5,
      image: "/menu/onion-rings.png",
      category: "Fritures",
      fullDescription: "Cinq anneaux d'oignon panés et frits, croustillants."
    },
    {
      id: "frit5",
      name: "Frites Portion",
      description: "Portion de frites fraîches",
      price: 4.0,
      image: "/menu/french-fries.png",
      category: "Fritures",
      fullDescription:
        "Portion généreuse de frites fraîches, croustillantes à l'extérieur et moelleuses à l'intérieur."
    },
    {
      id: "frit6",
      name: "Pommes de Terre Sautées",
      description: "Pommes de terre sautées aux herbes",
      price: 4.0,
      image: "/placeholder.svg?height=300&width=400&text=Pommes+Sautées",
      category: "Fritures",
      fullDescription: "Pommes de terre sautées avec herbes fraîches et épices."
    },
    {
      id: "frit7",
      name: "Ailes de Poulet Frites",
      description: "Ailes de poulet croustillantes",
      price: 7.5,
      image: "/menu/fried-chicken-wings.png",
      category: "Fritures",
      fullDescription:
        "Ailes de poulet marinées et frites, croustillantes à l'extérieur et tendres à l'intérieur."
    },

    // PIZZAS
    {
      id: "pizza1",
      name: "Pizza Margherita",
      description: "Sauce tomate, mozzarella, basilic",
      price: 0, // X.XX€
      image: "/pizza/margarita.jpg",
      category: "Pizzas",
      fullDescription:
        "Pizza traditionnelle italienne avec sauce tomate, mozzarella et basilic frais."
    },
    {
      id: "pizza2",
      name: "Pizza Reine",
      description: "Sauce tomate, jambon, champignon, gruyère",
      price: 0, // X.XX€
      image: "/pizza/reine.jpg",
      category: "Pizzas",
      fullDescription:
        "Pizza reine avec sauce tomate, jambon, champignons frais et gruyère."
    },
    {
      id: "pizza3",
      name: "Pizza Fromages",
      description: "Sauce tomate, gruyère, mozzarella, bleu, chèvre",
      price: 0, // X.XX€
      image: "/pizza/fromages.jpg",
      category: "Pizzas",
      fullDescription:
        "Pizza quatre fromages avec gruyère, mozzarella, bleu et chèvre."
    },
    {
      id: "pizza4",
      name: "Pizza Hawaïenne (Halal)",
      description:
        "Sauce tomate, filet de poulet, ananas, parmesan, mozzarella",
      price: 0, // X.XX€
      image: "/pizza/hawaian.jpg",
      category: "Pizzas",
      fullDescription:
        "Pizza hawaïenne halal avec filet de poulet, ananas, parmesan et mozzarella."
    },
    {
      id: "pizza5",
      name: "Pizza Salami",
      description: "Sauce tomate, salami, mozzarella",
      price: 0, // X.XX€
      image: "/pizza/salami.jpg",
      category: "Pizzas",
      fullDescription: "Pizza au salami avec sauce tomate et mozzarella."
    },
    {
      id: "pizza6",
      name: "Pizza Chicken (Halal)",
      description: "Crème fraîche, blanc de poulet, champignons, oignons",
      price: 0, // X.XX€
      image: "/pizza/chicken.jpg",
      category: "Pizzas",
      fullDescription:
        "Pizza au poulet halal avec crème fraîche, champignons et oignons."
    },
    {
      id: "pizza7",
      name: "Pizza Pepperoni",
      description: "Sauce tomate, pepperoni, mozzarella, gruyère",
      price: 0, // X.XX€
      image: "/pizza/pepperoni.jpg",
      category: "Pizzas",
      fullDescription:
        "Pizza pepperoni avec sauce tomate, mozzarella et gruyère."
    },
    {
      id: "pizza8",
      name: "Pizza Alsacienne",
      description: "Crème fraîche, lardons, champignons, oignons, gruyère",
      price: 0, // X.XX€
      image: "/pizza/alsacienne.jpg",
      category: "Pizzas",
      fullDescription:
        "Pizza alsacienne avec crème fraîche, lardons, champignons, oignons et gruyère."
    },
    {
      id: "pizza9",
      name: "Pizza Thon",
      description: "Sauce tomate, thon, mozzarella, oignons, roquette",
      price: 0, // X.XX€
      image: "/pizza/thon.jpg",
      category: "Pizzas",
      fullDescription:
        "Pizza au thon avec sauce tomate, mozzarella, oignons et roquette."
    },
    {
      id: "pizza10",
      name: "Pizza Nordique",
      description: "Crème fraîche, oignons, mozzarella, saumon fumé",
      price: 0, // X.XX€
      image: "/placeholder.svg?height=300&width=400&text=Pizza+Nordique",
      category: "Pizzas",
      fullDescription:
        "Pizza nordique avec crème fraîche, oignons, mozzarella et saumon fumé."
    },
    {
      id: "pizza11",
      name: "Pizza Végétarienne",
      description: "Sauce tomate, épinards, œuf, mozzarella",
      price: 0, // X.XX€
      image: "/menu/vegetable-pizza.png",
      category: "Pizzas",
      fullDescription:
        "Pizza végétarienne avec sauce tomate, épinards frais, œuf et mozzarella."
    },
    {
      id: "pizza12",
      name: "Pizza Légumes",
      description: "Sauce tomate, champignons, oignons, tomates, courgettes",
      price: 0, // X.XX€
      image: "/menu/pizza-legumes.png",
      category: "Pizzas",
      fullDescription:
        "Pizza aux légumes avec champignons, oignons, tomates et courgettes."
    },

    // SALADES
    {
      id: "salad1",
      name: "Salade au Thon",
      description: "Salade verte, thon, œuf, sauce au choix",
      price: 9.9,
      image: "/placeholder.svg?height=300&width=400&text=Salade+Thon",
      category: "Salades",
      fullDescription: "Salade fraîche avec thon, œuf dur et sauce au choix."
    },
    {
      id: "salad2",
      name: "Salade Mozzarella",
      description:
        "Salade verte, tomate, mozzarella, pesto, basilic, sauce au choix",
      price: 9.9,
      image: "/placeholder.svg?height=300&width=400&text=Salade+Mozzarella",
      category: "Salades",
      fullDescription:
        "Salade italienne avec mozzarella, tomates, pesto, basilic et sauce au choix."
    },
    {
      id: "salad3",
      name: "Salade M.N. Traiteur",
      description:
        "Salade verte, concombre, tomate, oignon, maïs, poivron, piment vert, olives",
      price: 9.9,
      image: "/placeholder.svg?height=300&width=400&text=Salade+MN",
      category: "Salades",
      fullDescription:
        "Notre salade signature avec légumes frais variés et sauce au choix."
    },
    {
      id: "salad4",
      name: "Salade César",
      description:
        "Salade verte, tomates, blanc de poulet, tranches de pain, sauce",
      price: 9.9,
      image: "/placeholder.svg?height=300&width=400&text=Salade+César",
      category: "Salades",
      fullDescription:
        "Salade César classique avec poulet grillé, croûtons et sauce César."
    },

    // BOISSONS
    {
      id: "drink1",
      name: "Coca Cola",
      description: "Boisson gazeuse rafraîchissante",
      price: 2.5,
      image: "/menu/coca-cola.png",
      category: "Boissons",
      fullDescription:
        "Coca-Cola classique, parfait pour accompagner vos plats."
    },
    {
      id: "drink2",
      name: "Coca Cola Cherry",
      description: "Coca Cola saveur cerise",
      price: 2.5,
      image: "/placeholder.svg?height=300&width=400&text=Coca+Cherry",
      category: "Boissons",
      fullDescription:
        "Coca-Cola saveur cerise, une variante fruitée du classique."
    },
    {
      id: "drink3",
      name: "Ice Tea Pêche",
      description: "Thé glacé saveur pêche",
      price: 2.5,
      image: "/placeholder.svg?height=300&width=400&text=Ice+Tea",
      category: "Boissons",
      fullDescription: "Thé glacé rafraîchissant à la pêche."
    },
    {
      id: "drink4",
      name: "Oasis Tropical",
      description: "Boisson aux fruits tropicaux",
      price: 2.5,
      image: "/placeholder.svg?height=300&width=400&text=Oasis",
      category: "Boissons",
      fullDescription: "Boisson rafraîchissante aux fruits tropicaux."
    },
    {
      id: "drink5",
      name: "Red Bull",
      description: "Boisson énergisante",
      price: 2.5,
      image: "/placeholder.svg?height=300&width=400&text=Red+Bull",
      category: "Boissons",
      fullDescription: "Boisson énergisante Red Bull pour un boost d'énergie."
    },
    {
      id: "drink6",
      name: "Carola Bleue",
      description: "Eau gazeuse",
      price: 2.5,
      image: "/placeholder.svg?height=300&width=400&text=Carola+Bleue",
      category: "Boissons",
      fullDescription: "Eau gazeuse Carola bleue, rafraîchissante."
    },
    {
      id: "drink7",
      name: "Carola Rouge",
      description: "Eau plate",
      price: 2.5,
      image: "/placeholder.svg?height=300&width=400&text=Carola+Rouge",
      category: "Boissons",
      fullDescription: "Eau plate Carola rouge, pure et rafraîchissante."
    },

    // DESSERTS
    {
      id: "dessert1",
      name: "Tiramisu Classique",
      description: "Tiramisu traditionnel italien",
      price: 3.5,
      image: "/menu/tiramisu-classique.png",
      category: "Desserts",
      fullDescription:
        "Tiramisu traditionnel italien avec mascarpone, café et cacao."
    },
    {
      id: "dessert2",
      name: "Tiramisu aux Framboises",
      description: "Tiramisu aux framboises fraîches",
      price: 3.5,
      image: "/menu/tiramisu-framboises.png",
      category: "Desserts",
      fullDescription:
        "Tiramisu revisité avec framboises fraîches et mascarpone."
    },
    {
      id: "dessert3",
      name: "Tiramisu au Citron (Limoncello)",
      description: "Tiramisu au citron et limoncello",
      price: 3.5,
      image: "/menu/tiramisu-citron.png",
      category: "Desserts",
      fullDescription: "Tiramisu au citron avec une pointe de limoncello."
    },
    {
      id: "dessert4",
      name: "Cheesecake",
      description: "Cheesecake crémeux",
      price: 3.5,
      image: "/menu/cheesecake.png",
      category: "Desserts",
      fullDescription:
        "Cheesecake crémeux sur base de biscuits, un classique américain."
    },
    {
      id: "dessert5",
      name: "Cookie",
      description: "Cookie aux pépites de chocolat",
      price: 2.5,
      image: "/menu/cookie.png",
      category: "Desserts",
      fullDescription: "Cookie moelleux aux pépites de chocolat, fait maison."
    },
    {
      id: "dessert6",
      name: "Tarte aux Pommes",
      description: "Tarte aux pommes traditionnelle",
      price: 2.5,
      image: "/menu/tarte-pommes.png",
      category: "Desserts",
      fullDescription:
        "Tarte aux pommes traditionnelle avec pâte brisée et pommes fondantes."
    },
    {
      id: "dessert7",
      name: "Glace Parfum au Choix",
      description: "Glace artisanale, parfum au choix",
      price: 0, // X.XX€
      image: "/menu/glace-parfum.png",
      category: "Desserts",
      fullDescription:
        "Glace artisanale avec parfum au choix : vanille, chocolat, fraise, pistache."
    },
    // ACCOMPAGNEMENTS
    {
      id: "side1",
      name: "Riz",
      description: "Portion de riz basmati",
      price: 3.5,
      image: "/placeholder.svg?height=300&width=400&text=Riz",
      category: "Accompagnements",
      fullDescription:
        "Riz basmati parfumé, parfait pour accompagner vos plats."
    }
  ];

  // Get unique categories from menuItems
  const categories = useMemo(() => {
    const uniqueCategories = new Set(menuItems.map((item) => item.category));
    return ["Tout", ...Array.from(uniqueCategories)];
  }, [menuItems]);

  // Filter menuItems based on activeCategory
  const filteredItems = useMemo(() => {
    if (activeCategory === "Tout") {
      return menuItems;
    }
    return menuItems.filter((item) => item.category === activeCategory);
  }, [menuItems, activeCategory]);

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
          image: item.image,
          quantity: 1
        });
        toast.success(`${item.name} ajouté au panier`);
      }
    } else {
      // Update existing item
      updateQuantity(productId, newQuantity);
    }
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
        {/* New Header Style */}
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

        {/* Filter Tags */}
        <div className='flex flex-wrap justify-center gap-1 sm:gap-2 mb-8 sm:mb-12'>
          {categories.map((category) => (
            <Button
              key={category}
              variant='outline'
              onClick={() => setActiveCategory(category)}
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

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6'>
          {filteredItems.map((product, index) => {
            const quantity = getItemQuantityInCart(product.id);
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
                    src={product.image || "/placeholder.svg"}
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
                      {product.price === 0
                        ? "X.XX€"
                        : `${product.price.toFixed(2)} €`}
                    </p>
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
                      style={{ fontFamily: "Arial" }}
                    >
                      {/* Mobile: Icon only, Desktop: Icon + Text */}
                      <ShoppingCart className='h-3 w-3 sm:h-4 sm:w-4 sm:mr-2' />
                      <span className='hidden sm:inline'>
                        {product.price === 0
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
                        <span className='hidden sm:inline'>Aperçu rapide</span>
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
                          <DialogDescription className='text-sm sm:text-lg text-muted-foreground'>
                            {selectedProduct.description}
                          </DialogDescription>
                        </DialogHeader>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4'>
                          <div className='relative w-full h-48 sm:h-64 rounded-lg overflow-hidden'>
                            <Image
                              src={selectedProduct.image || "/placeholder.svg"}
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
                                {selectedProduct.price === 0
                                  ? "X.XX€"
                                  : `${selectedProduct.price.toFixed(2)} €`}
                              </p>
                              <p className='text-sm sm:text-base text-muted-foreground'>
                                {selectedProduct.fullDescription ||
                                  selectedProduct.description}
                              </p>
                            </div>
                            {/* Add to cart button in modal */}
                            {quantity === 0 ? (
                              <Button
                                className='w-full mt-4 sm:mt-6 bg-red-600 hover:bg-red-700 text-white'
                                onClick={() =>
                                  handleUpdateCartItemQuantity(product.id, 1)
                                }
                                style={{ fontFamily: "Arial" }}
                              >
                                <ShoppingCart className='mr-2 h-4 w-4' />{" "}
                                Ajouter au panier
                              </Button>
                            ) : (
                              <div className='flex items-center justify-between w-full gap-2 mt-4 sm:mt-6'>
                                <Button
                                  variant='outline'
                                  size='icon'
                                  onClick={() =>
                                    handleUpdateCartItemQuantity(product.id, -1)
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
                                    handleUpdateCartItemQuantity(product.id, 1)
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
      </div>
    </section>
  );
}
