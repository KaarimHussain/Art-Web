import { ProductImage } from './ProductImage';
import { Tag } from './Tag';

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  isAvailable: boolean;
  quantityAvailable: number;

  medium: string;
  surface: string;
  style: string;

  widthInInches: number;
  heightInInches: number;
  depthInInches: number;

  isFramed: boolean;
  isSigned: boolean;
  yearCreated: string;

  featuredImage: string;
  images: ProductImage[];

  tags: Tag[];
  category: string;

  shippingWeightKg: number;
  shippingFromCountry: string;

  isSold: boolean;
  isFeatured: boolean;
  createdAt: string; // ISO date string
}
