import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Product } from "./types";
import { entryForm, entryFormProduct as EntryFormProduct } from "./validations/product";

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
const toFloat = (value: FormDataEntryValue | null) => {
  const float = parseFloat(value as string);
  return isNaN(float) ? 0 : float;
}
const toInt = (value: FormDataEntryValue | null) => {
  const int = parseInt(value as string);
  return isNaN(int) ? 0 : int;
}

export function formToObject(form: FormData) {
  return {
    title: form.get("title")?.toString(),
    category: form.get('category')?.toString(),
    brand: form.get('brand')?.toString(),
    description: form.get('description')?.toString(),
    warranty: form.get('warranty')?.toString(),
    shipping: form.get('shipping')?.toString(),
    price: toFloat(form.get('price')),
    weight: toFloat(form.get("weight")),
    discount: toFloat(form.get("discount")),
    stock: toInt(form.get('stock')),
    dimensions_depth: toFloat(form.get('dimensions_depth')),
    dimensions_height: toFloat(form.get('dimensions_height')),
    dimensions_width: toFloat(form.get('dimensions_width'))
  };
}

export function localDatetime(str: string) {
  const date = new Date(str);
  return date.toLocaleString("se-SV");
}