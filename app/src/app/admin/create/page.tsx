"use client";
import { ContentWrapper } from "@/components/content-wrapper";
import ProductForm from "../../../components/admin/product-form";
import { Create } from "../actions";

export default function CreateProductPage() {
  return (
    <ContentWrapper>
      <ProductForm
        initialState={{}}
        serverAction={Create}
        submitButtonText='Add Product'
      />
    </ContentWrapper>
  );
}
