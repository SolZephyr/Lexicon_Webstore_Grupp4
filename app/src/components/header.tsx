import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { HeaderLink } from "./header/headerlink";
import HeaderCartButton from "./header/header-cart-button";
import HeaderUserButton from "./header/header-user-button";
import HeaderLinkDropdown from "@/components/header/headerlink-dropdown";
import HeaderMobileMenu from "@/components/header/header-mobile-menu";
import { NavItem } from "@/lib/types";

const nav: NavItem[] = [
  {
    slug: "/products",
    label: "Products",
    subcategories: [
      { label: "Smartphones", slug: "/category/smartphones" },
      { label: "Tablets", slug: "/category/tablets" },
      { label: "Mobile Accessories", slug: "/category/mobile-accessories" },
      { label: "Laptops", slug: "/category/laptops" },
    ],
  },
  { slug: "/about", label: "About" },
  { slug: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="bg-white full-width">
      <div className="flex items-center">
        <Link href="/" className="mr-10">
          <h1 className="text-2xl font-bold py-4">Group 4</h1>
        </Link>

        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            {nav.map((item) =>
              item.subcategories ? (
                <HeaderLinkDropdown
                  key={item.slug}
                  label={item.label}
                  href={item.slug}
                  subcategories={item.subcategories}
                />
              ) : (
                <NavigationMenuItem key={item.slug}>
                  <HeaderLink href={item.slug}>{item.label}</HeaderLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
        <section className="ml-auto flex flex-row gap-2">
          <HeaderUserButton />
          <HeaderCartButton />
          <HeaderMobileMenu nav={nav} />
        </section>
      </div>
    </header>
  );
}
