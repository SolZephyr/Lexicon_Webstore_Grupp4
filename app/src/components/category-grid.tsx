import { cn } from "@/lib/utils";
import Link from "next/link";
import { Smartphone, Tablet, Headphones, Laptop } from "lucide-react";
import { categories } from "@/lib/constants";

const ICONS = {
  smartphone: Smartphone,
  tablet: Tablet,
  headphones: Headphones,
  laptop: Laptop,
};

export default function CategoryGrid() {
  const categoriesWithIcons = categories.map((c) => ({ ...c, Icon: ICONS[c.icon] }));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
      <h2 className="text-xl font-bold border-b-2 border-b-brand-600 pb-1">Categories</h2>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {categoriesWithIcons.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className={cn(
              "border rounded flex flex-col items-center text-center bg-accent/40 py-4 gap-2 hover:bg-accent transition-colors"
            )}
          >
            <c.Icon size={48} strokeWidth={1} />
            <p className="text-sm font-semibold text-black/80">{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}