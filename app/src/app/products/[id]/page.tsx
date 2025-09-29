"use server";
import React, { Suspense } from "react";
import { getProduct } from "@/lib/data/products";
import { Metadata } from "next";
import ProductInfo from "@/components/products/product-info";
import Loader from "@/components/loader";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ [key: string]: string | undefined }> };

const BLOCKED_RANGES: [number, number][] = [ [1, 77], [83, 98], [113, 120], [137, 158], ];

function isBlockedId(id: number): boolean { return BLOCKED_RANGES.some(([start, end]) => id >= start && id <= end); }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const productId = params.id ? Number(params.id) : undefined;

  if (!productId || isBlockedId(productId)) return { title: "Not Found" };

  try {
    const product = await getProduct(productId);
    return {
      title: `Webshop - Details: ${product.title}`,
      description: `Page for ${product.title}`
    };
  } catch {
    return {
      title: `Not Found`
    };
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params;
  const productId = params.id ? Number(params.id) : undefined;

  if (typeof productId !== "number" || isNaN(productId) || isBlockedId(productId)) {
    return notFound();
  }
  try {
    const product = getProduct(productId);
    return (
      <Suspense key={productId} fallback={<Loader />}>
        <ProductInfo productTask={product} />
      </Suspense>
    );
  } catch {
    return notFound();
  }
}
