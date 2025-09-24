import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Product } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSKU(
  category: string,
  brand: string,
  title: string,
  id: number
): string {
  // helper function to get first N letters, pad if too short
  const getPart = (str: string, length: number) => {
    const cleanStr = str.replace(/\s+/g, '');
    return (cleanStr.slice(0, length).toUpperCase()).padEnd(length, 'X');
  };

  const catPart = getPart(category, 3);
  const brandPart = getPart(brand, 3);
  const titlePart = getPart(title, 3);

  // format ID to be at least 3 digits
  const idPart = id.toString().padStart(3, '0');

  return `${catPart}-${brandPart}-${titlePart}-${idPart}`;
}

export function formToProduct(form: FormData): Product {
  const toFloat = (value: FormDataEntryValue | null) => {
    if (value === null) return 0;
    const str = value as string;
    return parseFloat(str);
  }
  const toInt = (value: FormDataEntryValue | null) => {
    if (value === null) return 0;
    const str = value as string;
    return parseInt(str);
  }

  const weight = toFloat(form.get("weight"));
  const discountPercentage = toFloat(form.get("discount"));
  const price = toFloat(form.get('price'));
  const stock = toInt(form.get('stock'));
  const depth = toFloat(form.get('dimensions_depth'));
  const height = toFloat(form.get('dimensions_height'));
  const width = toFloat(form.get('dimensions_width'));
  const data: Partial<Product> = {
    title: form.get("title")?.toString(),
    category: form.get('category')?.toString(),
    brand: form.get('brand')?.toString(),
    description: form.get('description')?.toString(),
    price,
    weight,
    discountPercentage,
    stock,
    warrantyInformation: form.get('warranty')?.toString(),
    dimensions: {
      depth,
      height,
      width
    }
  };

  return data as Product;
}