"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavItem } from "@/lib/types";
import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeaderMobileMenu({ nav }: { nav: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="md:hidden px-2 rounded-md cursor-pointer data-[state=open]:bg-accent hover:bg-accent" aria-label="Open menu">
        <Menu width={38} height={38} aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-screen rounded-t-none">
        {nav.map((item, index) =>
          item.subcategories ? (
            <Collapsible key={index}>
              <CollapsibleTrigger className="group flex justify-between items-center py-1.5 px-2 font-bold w-full text-xl cursor-pointer hover:bg-accent rounded-md">
                <span>{item.label}</span>
                <ChevronDown
                  className="transition-transform duration-200 group-data-[state=open]:rotate-180"
                  size={24}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="flex flex-col py-1.5 px-4 gap-1">
                <Link
                  href={`/products`}
                  className="p-2 hover:bg-accent rounded-md"
                >
                  All Products
                </Link>
                {item.subcategories.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    href={subItem.slug}
                    className="p-2 hover:bg-accent rounded-md"
                  >
                    {subItem.label}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <DropdownMenuItem
              key={index}
              asChild
              className="data-highlighted:bg-accent cursor-pointer"
            >
              <Link href={item.slug} className="p-4 w-full font-bold text-xl">
                {item.label}
              </Link>
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
