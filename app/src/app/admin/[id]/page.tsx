import ProductForm from "@/components/admin/product-form";
import { ContentWrapper } from "@/components/content-wrapper";
import { getProduct } from "@/lib/data/products";
import { Edit } from "../actions";

type Props = { params: Promise<{ [key: string]: string | undefined }> };

export default async function ProductPage(props: Props) {
  const params = await props.params;
  const productId = params.id ? Number(params.id) : undefined;

  if (!productId) return { title: "Not Found" };

  const product = await getProduct(productId);
  return (
    <ContentWrapper>
      <ProductForm
        initialState={product}
        serverAction={Edit}
        submitButtonText='Update Product'
      />
    </ContentWrapper>
  );
}
