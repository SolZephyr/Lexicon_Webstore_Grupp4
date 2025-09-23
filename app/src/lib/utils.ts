import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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