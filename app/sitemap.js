import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function sitemap() {
  // Base URL for the site
  const baseUrl = 'https://www.mn-traiteur.com';
  
  // Define static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
  
  // Fetch all products for dynamic product pages
  const { data: products } = await supabase
    .from('products')
    .select('id, updated_at')
    .order('updated_at', { ascending: false });
    
  // Map products to sitemap entries
  const productPages = products?.map(product => ({
    url: `${baseUrl}/menu/${product.id}`,
    lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  })) || [];
  
  // Fetch all categories for category pages
  const { data: categories } = await supabase
    .from('categories')
    .select('name, updated_at');
    
  // Map categories to sitemap entries
  const categoryPages = categories?.map(category => {
    const slug = category.name.toLowerCase().replace(/\s+/g, '-');
    return {
      url: `${baseUrl}/menu/${slug}`,
      lastModified: category.updated_at ? new Date(category.updated_at) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  }) || [];
  
  // Combine all pages
  return [...staticPages, ...categoryPages, ...productPages];
}
