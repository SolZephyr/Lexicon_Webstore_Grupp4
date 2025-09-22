import HeroProductCard, {
  ProductCardProps,
} from "@/components/hero/hero-product-card";
import { getProductsById } from "@/lib/data/products";

interface ProductConfig
  extends Omit<ProductCardProps, "title" | "description" | "price" | "image"> {
  id: number;
  title?: string;
  showDescription?: boolean;
  showPrice?: boolean;
}

const PRODUCT_IDS: ProductConfig[] = [
  { id: 79, variant: "large", title: "Asus Zenbook Pro", cta: "Learn More", showPrice: true, showDescription: true, className: "col-span-6 row-span-6 xs:row-span-4 bg-gradient-to-tl from-blue-300 to-purple-200 xl:col-span-4" },
  { id: 123, cta: "Shop Now", showPrice: true, className: "col-span-2 row-span-3 col-start-5 bg-gradient-to-t from-slate-400 to-slate-200 hidden xl:flex" },
  { id: 99, variant: "centered", cta: "Discover Now", showPrice: true, light: true, className: "col-span-2 row-span-3 col-start-5 row-start-4 bg-gradient-to-t from-indigo-500 to-blue-400 hidden xl:flex" },
  { id: 159, variant: "wide", cta: "Explore", title: "iPad Mini", light: true, className: "hidden xs:flex col-span-6 sm:col-span-3 row-span-2 xl:row-span-2 xl:row-start-5 xl:col-span-2 bg-gradient-to-b from-red-400 to-yellow-300" },
  { id: 100, cta: "Shop Now", light: true, variant: "wide", className: "hidden col-span-3 row-span-2 sm:flex xl:row-span-2 xl:col-start-3 xl:row-start-5 xl:col-span-2 bg-gradient-to-b from-stone-800 to-gray-500" },
];

export default async function HeroSection() {
  const ids = PRODUCT_IDS.map((p) => p.id);
  const products = await getProductsById(ids, "hero");

  return (
    <section className="grid grid-cols-6 grid-rows-6 gap-2 min-h-[32rem]">
      {products?.map((product, index) => {
        const config = PRODUCT_IDS[index];
        if (!product) return null;

        const props = {
          title: config.title ?? product.title,
          image: product.images?.[0],
          description: config.showDescription ? product.description : undefined,
          price: config.showPrice ? product.price : undefined,
          cta: config.cta,
          variant: config.variant,
          light: config.light,
          className: config.className,
          id: product.id,
        };

        return <HeroProductCard key={product.id} {...props} />;
      })}
    </section>
  );
}
