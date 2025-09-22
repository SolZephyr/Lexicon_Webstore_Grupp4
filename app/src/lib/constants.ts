import { Smartphone, Tablet, Headphones, Laptop, LucideIcon } from "lucide-react";

export type CategoryProps = {
  href: string;
  icon: LucideIcon;
  label: string;
};

export const categories: CategoryProps[] = [
  { href: "/category/smartphones", icon: Smartphone, label: "Smartphones" },
  { href: "/category/tablets", icon: Tablet, label: "Tablets" },
  {
    href: "/category/mobile-accessories",
    icon: Headphones,
    label: "Mobile Accessories",
  },
  { href: "/category/laptops", icon: Laptop, label: "Laptops" },
];