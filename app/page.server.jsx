import { createClient } from '@supabase/supabase-js';
import { Suspense } from 'react';
import ClientPage from './page.client';
import LoadingScreen from '@/components/loading-screen';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Fetch hero slides data
async function getHeroSlides() {
  const { data, error } = await supabase
    .from("hero_slides")
    .select("*")
    .order("slide_order", { ascending: true });
  
  if (error) {
    console.error("Error fetching hero slides:", error);
    return [];
  }
  
  return data || [];
}

// Fetch menu data
async function getMenuData() {
  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      supabase.from("products").select("*").order("name"),
      supabase.from("categories").select("*").order("name")
    ]);

    if (categoriesResponse.error) {
      console.error("Categories error:", categoriesResponse.error);
      throw new Error(`Categories: ${categoriesResponse.error.message}`);
    }
    if (productsResponse.error) {
      console.error("Products error:", productsResponse.error);
      throw new Error(`Products: ${productsResponse.error.message}`);
    }

    const catMap = {};
    const categoryNames = ["Tout"];
    if (categoriesResponse.data) {
      categoriesResponse.data.forEach((cat) => {
        catMap[cat.id] = cat.name;
        categoryNames.push(cat.name);
      });
    }

    return {
      products: productsResponse.data || [],
      categories: categoryNames,
      categoriesMap: catMap
    };
  } catch (err) {
    console.error("Error in getMenuData:", err);
    return { products: [], categories: ["Tout"], categoriesMap: {} };
  }
}

// Get static reviews data - not stored in Supabase
function getReviews() {
  // Return static reviews data
  return [
    {
      id: 1,
      name: "Emilie Dupont",
      location: "Strasbourg",
      rating: 5,
      text: "Une expérience incroyable avec la Grillade au charbon de bois ! La viande était parfaitement cuite, pleine de saveurs. Livraison rapide et un service impeccable. Je recommande vivement à tous les amateurs de bonne cuisine.",
      dish_type: "Grillade au charbon de bois"
    },
    {
      id: 2,
      name: "Thomas Berger",
      location: "Bischheim",
      rating: 5,
      text: "Les Assiettes sont délicieuses, très bien équilibrées et généreuses. Une livraison rapide et un service soigné. Je suis plus que satisfait de ma commande, c'est une adresse que je vais garder dans mes favoris.",
      dish_type: "Nos Assiettes"
    },
    {
      id: 3,
      name: "Claire Martin",
      location: "Haguenau",
      rating: 5,
      text: "Les Boissons étaient parfaites pour accompagner nos plats. Tout était frais, bien préparé et livré en un rien de temps. C'était une excellente expérience, je reviendrai sans hésiter.",
      dish_type: "Nos Boissons"
    },
    {
      id: 4,
      name: "Julien Lefevre",
      location: "Schiltigheim",
      rating: 5,
      text: "Les Burgers sont absolument délicieux. Chaque bouchée était un régal. Livraison rapide, comme toujours, et présentation impeccable. Je vais certainement recommander à mes amis.",
      dish_type: "Nos Burgers"
    },
    {
      id: 5,
      name: "Sophie Charbonnier",
      location: "Geispolsheim",
      rating: 5,
      text: "Des Desserts à tomber ! Tout était parfait, de la présentation à la saveur. Très rapide et pratique, la livraison a été faite sans aucun souci. C'est une option parfaite pour finir un repas.",
      dish_type: "Nos Desserts"
    }
  ];
}

// Main server component
export default async function HomePage() {
  // Fetch all data in parallel
  const [heroSlides, menuData, reviews] = await Promise.all([
    getHeroSlides(),
    getMenuData(),
    getReviews()
  ]);
  
  // Create structured data for the restaurant
  const restaurantStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'M.N. Traiteur',
    url: 'https://mn-traiteur.fr',
    logo: 'https://mn-traiteur.fr/logo.png',
    image: heroSlides[0]?.image_url || 'https://mn-traiteur.fr/default-image.jpg',
    description: 'Découvrez nos plats français préparés avec des ingrédients frais et de qualité, livrés directement à votre porte.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '19 rue Forlen',
      addressLocality: 'Geispolsheim',
      postalCode: '67118',
      addressCountry: 'FR'
    },
    telephone: '+33 6 12 53 43 76',
    email: 'info@mn-traiteur.fr',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '11:30',
        closes: '14:30'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '18:00',
        closes: '21:45'
      }
    ],
    servesCuisine: 'French',
    priceRange: '€€',
    menu: {
      '@type': 'Menu',
      hasMenuSection: Object.entries(
        menuData.products.reduce((acc, product) => {
          const categoryName = menuData.categoriesMap[product.category_id] || 'Autre';
          if (!acc[categoryName]) {
            acc[categoryName] = [];
          }
          acc[categoryName].push(product);
          return acc;
        }, {})
      ).map(([categoryName, products]) => ({
        '@type': 'MenuSection',
        name: categoryName,
        hasMenuItem: products.map(product => ({
          '@type': 'MenuItem',
          name: product.name,
          description: product.description || `${product.name} - M.N. Traiteur`,
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'EUR'
          },
          image: product.image_url || 'https://mn-traiteur.fr/default-product.jpg'
        }))
      }))
    }
  };
  
  // Create structured data for reviews
  const reviewsStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'M.N. Traiteur',
    review: reviews.map(review => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: '5'
      },
      author: {
        '@type': 'Person',
        name: review.author_name
      },
      datePublished: review.created_at,
      reviewBody: review.content,
      itemReviewed: {
        '@type': 'Restaurant',
        name: 'M.N. Traiteur'
      }
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviews.reduce((sum, review) => sum + review.rating, 0) / (reviews.length || 1),
      reviewCount: reviews.length
    }
  };
  
  // Create local business structured data
  const localBusinessStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'M.N. Traiteur',
    image: heroSlides[0]?.image_url || 'https://mn-traiteur.fr/default-image.jpg',
    '@id': 'https://mn-traiteur.fr',
    url: 'https://mn-traiteur.fr',
    telephone: '+33 6 12 53 43 76',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '19 rue Forlen',
      addressLocality: 'Geispolsheim',
      postalCode: '67118',
      addressCountry: 'FR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '48.5289',
      longitude: '7.6650'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '11:30',
        closes: '14:30'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '18:00',
        closes: '21:45'
      }
    ],
    sameAs: [
      'https://www.facebook.com/mntraiteur',
      'https://www.instagram.com/mn_traiteur'
    ]
  };
  
  // Create breadcrumb structured data
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://mn-traiteur.fr'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Menu',
        item: 'https://mn-traiteur.fr/#menu'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'À propos',
        item: 'https://mn-traiteur.fr/#about'
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Avis',
        item: 'https://mn-traiteur.fr/#reviews'
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Contact',
        item: 'https://mn-traiteur.fr/#contact'
      }
    ]
  };

  return (
    <>
      {/* Add JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(restaurantStructuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewsStructuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessStructuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData)
        }}
      />
      
      {/* Wrap the client component in Suspense for better loading UX */}
      <Suspense fallback={<LoadingScreen />}>
        <ClientPage 
          initialHeroSlides={heroSlides}
          initialMenuData={menuData}
          initialReviews={reviews}
        />
      </Suspense>
    </>
  );
}

// Enable ISR with revalidation every minute for development
export const revalidate = 60; // seconds
