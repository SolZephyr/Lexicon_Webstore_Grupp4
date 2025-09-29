"use client";
import { HeaderLink } from "@/components/header/headerlink";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

type Subcategory = {
  label: string;
  slug: string;
};

type HeaderLinkDropdownProps = {
  label: string;
  href: string;
  subcategories: Subcategory[];
  subcategoryPath?: string;
};

export function useIsActive(item: NavItem) {
  const pathname = usePathname();

  const main = `/${item.slug.replace(/^\/?/, "")}`;

  return (
    pathname === main ||
    item.subcategories?.some((s) =>
      pathname.startsWith(`/${s.slug.replace(/^\/?/, "")}`)
    ) ||
    (main === "/products" && pathname.startsWith("/products/"))
  );
}

export default function HeaderLinkDropdown({
  label,
  href,
  subcategories,
}: HeaderLinkDropdownProps) {
  const router = useRouter();
  const isActive = useIsActive({ label, slug: href, subcategories });

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          "cursor-pointer text-muted-foreground font-bold",
          isActive && " text-black"
        )}
        onClick={() => {
          router.push(href);
        }}
      >
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-1 w-[200px]">
          {subcategories.map((subitem, index) => (
            <li key={index}>
              <HeaderLink href={subitem.slug} dropdown>
                {subitem.label}
              </HeaderLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
