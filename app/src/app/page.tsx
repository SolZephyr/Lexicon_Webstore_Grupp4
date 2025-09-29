import CategoryGrid from "@/components/category-grid";
import { ContentWrapper } from "@/components/content-wrapper";
import FeaturedGrid from "@/components/featured-grid";
import HeroSection from "@/components/hero";
import { getRandomProducts } from "@/lib/data/products";

export default async function Home() {
  const products = await getRandomProducts();
  return (
    <>
      <ContentWrapper className="p-0 sm:p-4 bg-transparent sm:bg-white">
        <HeroSection />
      </ContentWrapper>
      <ContentWrapper>
        <CategoryGrid/>
      </ContentWrapper>
      <ContentWrapper>
        <FeaturedGrid products={products} />
      </ContentWrapper>
    </>
  );
}
