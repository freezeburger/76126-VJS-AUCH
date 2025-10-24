import type { Category, LongText, ShortText, WithUniqueId } from "../types/generic.type";

export interface ProductDTO extends WithUniqueId {
  title: ShortText
  description: LongText
  category: Category;
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: ShortText
  weight: number
  dimensions: Dimensions
  warrantyInformation: LongText
  shippingInformation: LongText
  availabilityStatus: ShortText
  reviews: Review[]
  returnPolicy: LongText
  minimumOrderQuantity: number
  meta: Meta
  images: string[]
  thumbnail: string
}

export interface Dimensions {
  width: number
  height: number
  depth: number
}

export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface Meta {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}