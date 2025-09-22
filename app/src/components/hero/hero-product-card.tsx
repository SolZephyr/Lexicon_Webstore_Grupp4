import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Variant = "normal" | "large" | "wide" | "centered";

export interface ProductCardProps {
  variant?: Variant;
  className?: string;
  title: string;
  image?: string;
  description?: string | null;
  price?: number;
  cta?: string;
  light?: boolean;
  id: number;
}

type VariantStyleMap = Record<
  "container" | "content" | "textWrapper" | "title" | "description" | "ctaWrapper" | "imageWrapper",
  Partial<Record<Variant, string>>
>;

const variantStyles: VariantStyleMap = {
  container: { centered: "justify-center" },
  content: { large: "md:w-[calc(100%-384px)] w-full", centered: "items-center text-center"},
  textWrapper: {
    large: "gap-4 lg:gap-8 text-center items-center md:items-baseline md:text-left",
    wide: "items-center text-center md:items-baseline md:text-left",
  },
  title: { large: "text-4xl xs:text-2xl sm:text-4xl", wide: "text-xl" },
  description: { large: "hidden md:block" },
  ctaWrapper: { large: "justify-center  md:justify-normal", wide: "justify-center md:justify-normal"},
  imageWrapper: {
    normal: "-right-2 top-1/2 -translate-y-1/2",
    large: "w-96 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:top-1/2 md:bottom-auto md:right-0 md:left-auto md:-translate-x-0 md:-translate-y-1/2",
    wide: "w-48 -bottom-20 left-1/2 -translate-x-1/2 md:bottom-auto md:left-auto md:-translate-x-0 md:-right-2 md:top-1/2 md:-translate-y-1/2",
    centered: "-bottom-18 left-1/2 -translate-x-1/2",
  },
};

export default function HeroProductCard({
  variant = "normal",
  className,
  title,
  image = "/next.svg",
  description,
  price,
  cta = "Shop Now",
  light = false,
  id,
}: ProductCardProps) {
  const containerClasses = variantStyles.container[variant];
  const contentClasses = variantStyles.content[variant];
  const textWrapperClasses = variantStyles.textWrapper[variant];
  const titleClasses = variantStyles.title[variant];
  const descriptionClasses = variantStyles.description[variant];
  const ctaWrapperClasses = variantStyles.ctaWrapper[variant];
  const imageWrapperClasses = variantStyles.imageWrapper[variant];

  return (
    <article
      className={cn(
        "flex flex-col justify-between p-8 overflow-hidden rounded relative hover:scale-[1.01] transition-all",
        containerClasses,
        light && "text-white",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-col justify-between h-full gap-1 z-10",
          contentClasses
        )}
      >
        <div className={cn("flex flex-col gap-2", textWrapperClasses)}>
          <h2 className={cn("font-bold text-2xl", titleClasses)}>{title}</h2>
          {description ? (
            <p className={cn("text-sm font-light", descriptionClasses)}>
              {description}
            </p>
          ) : null}
          {price ? (
            <p className={cn("text-sm font-light", descriptionClasses)}>
              from <strong className="font-semibold">{price}$</strong>
            </p>
          ) : null}
        </div>
        <div className={cn("flex z-10", ctaWrapperClasses)}>
          <Button
            asChild
            variant={light ? "secondary" : "default"}
            size={variant === "centered" ? "lg" : "default"}
            className={cn(
              "shadow-lg cursor-pointer",
              variant === "large" && "w-full xs:w-auto"
            )}
          >
            <Link href={`/products/${id}`}>{cta}</Link>
          </Button>
        </div>
      </div>
      <div className={cn("absolute w-64", imageWrapperClasses)}>
        <Image
          src={image}
          alt={title}
          width={600}
          height={600}
          priority
          className="z-0"
        />
      </div>
    </article>
  );
}
