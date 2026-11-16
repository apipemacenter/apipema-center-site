export type StoreCategory = 'Serviços' | 'Moda' | 'Alimentação';

export type CardSurfaceTone = 'light' | 'olive';

export interface StoreBrand {
  id: string;
  name: string;
  category: StoreCategory;
  logo: string;
  width: number;
  height: number;
  logoScale?: 'wide' | 'tall' | 'compact';
  surfaceTone?: CardSurfaceTone;
}

export const storeCategories: Array<'Todas' | StoreCategory> = [
  'Todas',
  'Serviços',
  'Moda',
  'Alimentação',
];

export const storeBrands: StoreBrand[] = [
  // Serviços
  {
    id: 'dryclean-usa',
    name: 'DryClean USA',
    category: 'Serviços',
    logo: '/images/stores/dryclean-usa.webp',
    width: 260,
    height: 82,
    logoScale: 'wide',
    surfaceTone: 'light',
  },
  {
    id: 'health-pilates',
    name: 'Health Pilates',
    category: 'Serviços',
    logo: '/images/stores/health-pilates.webp',
    width: 480,
    height: 154,
    logoScale: 'wide',
    surfaceTone: 'light',
  },
  {
    id: 'barbearia-sinhozinho',
    name: 'Barbearia Sinhozinho',
    category: 'Serviços',
    logo: '/images/stores/barbearia-sinhozinho.webp',
    width: 336,
    height: 260,
    logoScale: 'tall',
    surfaceTone: 'light',
  },
  {
    id: 'la-formme',
    name: 'La Formme',
    category: 'Serviços',
    logo: '/images/stores/la-formme.webp',
    width: 284,
    height: 260,
    logoScale: 'tall',
    surfaceTone: 'light',
  },
  {
    id: 'anna-pegova',
    name: 'Anna Pegova',
    category: 'Serviços',
    logo: '/images/stores/anna-pegova.svg',
    width: 329,
    height: 96,
    logoScale: 'wide',
    surfaceTone: 'light',
  },
  {
    id: 'abtm',
    name: 'ABTM',
    category: 'Serviços',
    logo: '/images/stores/abtm.webp',
    width: 480,
    height: 119,
    logoScale: 'wide',
    surfaceTone: 'light',
  },

  // Moda
  {
    id: 'ivna-aragao',
    name: 'Ivna Aragão',
    category: 'Moda',
    logo: '/images/stores/ivna-aragao.webp',
    width: 480,
    height: 227,
    logoScale: 'compact',
    surfaceTone: 'light',
  },
  {
    id: 'gemma-boutique',
    name: 'Gemma Boutique',
    category: 'Moda',
    logo: '/images/stores/gemma-boutique.webp',
    width: 480,
    height: 135,
    logoScale: 'wide',
    surfaceTone: 'olive',
  },
  {
    id: 'eliane-ottoni',
    name: 'Eliane Ottoni',
    category: 'Moda',
    logo: '/images/stores/eliane-ottoni.webp',
    width: 480,
    height: 199,
    logoScale: 'compact',
    surfaceTone: 'light',
  },

  // Alimentação
  {
    id: 'o-grao',
    name: 'Grão',
    category: 'Alimentação',
    logo: '/images/stores/o-grao.webp',
    width: 222,
    height: 260,
    logoScale: 'tall',
    surfaceTone: 'light',
  },
  {
    id: 'eny-confeitaria',
    name: 'Eny Confeitaria',
    category: 'Alimentação',
    logo: '/images/stores/eny-confeitaria.webp',
    width: 260,
    height: 260,
    logoScale: 'tall',
    surfaceTone: 'light',
  },
];
