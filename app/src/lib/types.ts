export interface SearchParamsString { [key: string]: string | undefined };

export interface ProductsFilter {
  limit?: number;
  page?: number;
  sort?: string;
  order?: string;
  categories?: string[];
  brand?: string[];
  search?: string;
  stock?: string;
}
export interface SidebarFilterValues {
  brand?: string[];
  price?: number[];
}

export interface ProductList {
  products: Product[]
  total: number
  skip: number
  limit: number
}


export interface ThinProductList {
  products: ThinProduct[]
  total: number
  skip: number
  limit: number
}

export interface ThinProduct {
  id: number
  title: string
  price: number
  discountPercentage: number
  thumbnail: string
  rating: number
  availabilityStatus: string
  stock: number
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand?: string
  sku: string
  weight: number
  dimensions: Dimensions
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: Review[]
  returnPolicy: string
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

export interface ShoppingCart {
  items: ShoppingCartItem[]
  totalQuantity: number
  totalPrice: number
}

export interface ShoppingCartItem {
  product: ThinProduct
  quantity: number
}

export const contactTypes = [
  { value: "support", label: "Support" },
  { value: "info", label: "Information" },
  { value: "complaints", label: "Complaints" },
] as const;

export const contactTypeValues = contactTypes.map((t) => t.value) as [
  (typeof contactTypes)[number]["value"],
  ...(typeof contactTypes)[number]["value"][]
];