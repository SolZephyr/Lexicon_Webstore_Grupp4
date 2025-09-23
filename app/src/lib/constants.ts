export type CategoryProps = {
  href: string;
  icon: "smartphone" | "tablet" | "headphones" | "laptop";
  label: string;
};

export const categories: CategoryProps[] = [
  { href: "/category/smartphones", icon: "smartphone", label: "Smartphones" },
  { href: "/category/tablets", icon: "tablet", label: "Tablets" },
  { href: "/category/mobile-accessories", icon: "headphones", label: "Mobile Accessories" },
  { href: "/category/laptops", icon: "laptop", label: "Laptops" },
];