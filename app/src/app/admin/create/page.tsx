import { ContentWrapper } from "@/components/content-wrapper";
import ProductForm from "../../../components/admin/product-form";
import { Create } from "../actions";
import { getBrandsByProducts } from "@/lib/data/products";

export default async function CreateProductPage() {
  const brands = await getBrandsByProducts();
  return (
    <ContentWrapper>
      <ProductForm
        brands={brands}
        initialState={{}}
        serverAction={Create}
        submitButtonText='Add Product'
      />
    </ContentWrapper>
  );
}
