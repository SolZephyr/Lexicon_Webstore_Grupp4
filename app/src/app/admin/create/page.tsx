"use client";
import { ContentWrapper } from "@/components/content-wrapper";
import ProductForm from "../../../components/admin/product-form";
import { Product } from "@/lib/types";

export default function CreateProductPage() {

  function postProduct(newState: Product): void {
    console.log("New State");
    console.dir(newState, { depth: null });
  }

  return (
    <ContentWrapper>
      <ProductForm initialState={{}} onSubmit={postProduct} />
    </ContentWrapper>
  );
}
