import { Product, Slide, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'Todos', slug: 'all' },
  { id: 'tshirts', name: 'Camisetas', slug: 'tshirts' },
  { id: 'pants', name: 'Calças', slug: 'pants' },
  { id: 'dresses', name: 'Vestidos', slug: 'dresses' },
  { id: 'shoes', name: 'Tênis', slug: 'shoes' },
  { id: 'accessories', name: 'Acessórios', slug: 'accessories' },
];

export const INITIAL_SLIDES: Slide[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
    title: 'Coleção Verão 2024',
    subtitle: 'Looks frescos e modernos para a estação mais quente.',
    ctaText: 'Explorar Agora',
    badge: 'NOVO',
    order: 1,
    active: true
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop',
    title: 'Urban Streetwear',
    subtitle: 'O estilo que domina as ruas da cidade.',
    ctaText: 'Ver Coleção',
    badge: 'TRENDING',
    order: 2,
    active: true
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=2070&auto=format&fit=crop',
    title: 'Sneakers Off',
    subtitle: 'Até 40% de desconto em modelos selecionados.',
    ctaText: 'Aproveitar',
    badge: 'SALE',
    order: 3,
    active: true
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Camiseta Oversized Premium',
    price: 89.90,
    category: 'tshirts',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.8,
    reviews: 124,
    description: 'Camiseta 100% algodão egípcio, modelagem oversized moderna e confortável. Ideal para compor looks casuais com estilo.',
    colors: ['#000000', '#FFFFFF', '#8B5CF6'],
    sizes: ['P', 'M', 'G', 'GG'],
    stock: { default: 50 },
    isNew: true,
    status: 'active'
  },
  {
    id: '2',
    name: 'Tênis Runner Pro',
    price: 299.90,
    originalPrice: 399.90,
    category: 'shoes',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop'
    ],
    rating: 4.9,
    reviews: 86,
    description: 'Tecnologia de amortecimento avançada para o máximo conforto no seu dia a dia ou treinos.',
    colors: ['#FFFFFF', '#10B981'],
    sizes: ['38', '39', '40', '41', '42'],
    stock: { default: 20 },
    isSale: true,
    status: 'active'
  },
  {
    id: '3',
    name: 'Calça Cargo Utility',
    price: 159.90,
    category: 'pants',
    images: ['https://images.unsplash.com/photo-1517445312582-06b9b0659b9a?q=80&w=1000&auto=format&fit=crop'],
    rating: 4.6,
    reviews: 42,
    description: 'Calça cargo com múltiplos bolsos funcionais e tecido resistente.',
    colors: ['#000000', '#4B5563'],
    sizes: ['38', '40', '42', '44'],
    stock: { default: 35 },
    status: 'active'
  },
  {
    id: '4',
    name: 'Vestido Floral Summer',
    price: 189.90,
    category: 'dresses',
    images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop'],
    rating: 4.7,
    reviews: 56,
    description: 'Leveza e elegância em uma peça única. Estampa exclusiva.',
    colors: ['#EC4899', '#FCD34D'],
    sizes: ['P', 'M', 'G'],
    stock: { default: 15 },
    status: 'active'
  },
  {
    id: '5',
    name: 'Jaqueta Bomber Tech',
    price: 349.90,
    category: 'accessories',
    images: ['https://images.unsplash.com/photo-1551028919-ac66e6a39d51?q=80&w=1000&auto=format&fit=crop'],
    rating: 5.0,
    reviews: 12,
    description: 'Proteção contra vento e água com estilo futurista.',
    colors: ['#1F2937'],
    sizes: ['M', 'G', 'GG'],
    stock: { default: 10 },
    isNew: true,
    status: 'active'
  },
  {
    id: '6',
    name: 'Boné Minimalist',
    price: 59.90,
    category: 'accessories',
    images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop'],
    rating: 4.5,
    reviews: 89,
    description: 'Design limpo e ajuste perfeito.',
    colors: ['#000000', '#FFFFFF', '#3B82F6'],
    sizes: ['Único'],
    stock: { default: 100 },
    status: 'active'
  }
];
