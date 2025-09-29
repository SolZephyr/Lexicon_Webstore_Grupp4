import ProductForm from "@/components/admin/product-form";
import { ContentWrapper } from "@/components/content-wrapper";
import { getBrandsByProducts, getProduct } from "@/lib/data/products";
import { Edit } from "../actions";
import { notFound } from "next/navigation";

export default async function EditPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = id ? Number(id) : undefined;

  if (!productId) return notFound();
  try {
    const [product, brands] = await Promise.all([
      getProduct(productId),
      getBrandsByProducts()
    ]);
    return (
      brands && (
        <ContentWrapper>
          <ProductForm
            brands={brands}
            productData={product}
            serverAction={Edit}
          />
        </ContentWrapper>
      )
    );
  } catch {
    return notFound();
  }
}
