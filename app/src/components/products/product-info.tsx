import React, { use } from "react";
import { ContentWrapper } from "../content-wrapper";
import Image from "next/image";
import { Product } from "@/lib/types";
import ProductPrice from "../product-price";
import { Separator } from "../ui/separator";
import StockStatus from "../stock-status";
import AddToCartButton from "../add-to-cart-button";
import NotFound from "@/app/not-found";
import { linkIcon } from "../footer";
import { FooterIcon } from "../footer/footer-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function ProductInfo({
  productTask,
}: {
  productTask: Promise<Product>;
}) {
  const product = use(productTask);
  if (!product || (typeof product === "object" && "message" in product)) {
    return <NotFound />;
  }
  const colorIcon: linkIcon[] = [
    { name: "Paypal", width: 14, height: 16 },
    { name: "Mastercard", width: 27, height: 16 },
    { name: "Visa", width: 42, height: 16 },
    { name: "Stripe", width: 40, height: 16 },
    { name: "Klarna", width: 72, height: 16 },
  ];

  return (
    <article className="flex flex-col gap-4">
      <ContentWrapper className="flex flex-col lg:flex-row gap-4" as="section">
        <div className="flex-shrink-0">
          <Image
            src={product.images?.[0] ?? "/placeholder-image.svg"}
            alt={product.title}
            width={500}
            height={500}
          />
        </div>

        <div className="flex flex-col gap-2 flex-grow mt-2 justify-start">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-lg font-semibold mb-2">
            Rating: {product.rating} ⭐
          </p>
          <ProductPrice
            price={product.price}
            discountPercentage={product.discountPercentage}
          />
          <p className="text-md  mb-2">Description: {product.description}</p>
          <p className="text-lg font-semibold mb-2">Brand: {product.brand}</p>
          <Separator />

          <div className="flex flex-col mt-2 mb-2">
            <StockStatus availabilityStatus={product.availabilityStatus} />
            <AddToCartButton product={product} />

            <p className="text-sm mb-2">Guaranteed Safe Checkout</p>
            <div className="flex gap-4 items-center justify-start">
              {colorIcon.map((item) => (
                <FooterIcon key={item.name} icon={item} />
              ))}
            </div>
          </div>

          <Separator />

          <p className="text-sm font-semibold">
            SKU: <span className="text-sm text-gray-500">{product.sku}</span>
          </p>
          <p className="text-sm font-semibold">
            CATEGORY:{" "}
            <span className="text-sm text-gray-500">{product.category}</span>
          </p>
          <p className="text-sm font-semibold">
            TAGS:{" "}
            <span className="text-sm text-gray-500">
              {product.tags.join(", ")}
            </span>
          </p>
        </div>
      </ContentWrapper>

      <ContentWrapper>
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="mb-2 bg-white flex flex-row align-middle justify-start">
            <TabsTrigger
              value="description"
              className="px-0 mr-8 text-base font-bold border-b-2 border-transparent data-[state=active]:text-black data-[state=active]:shadow-none data-[state=inactive]:text-gray-400 transition-colors data-[state=inactive]:hover:text-gray-600 data-[state=inactive]:hover:underline"
            >
              DESCRIPTION
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="px-0 text-base font-bold border-b-2 border-transparent data-[state=active]:text-black data-[state=active]:shadow-none data-[state=inactive]:text-gray-400 transition-colors data-[state=inactive]:hover:text-gray-600 data-[state=inactive]:hover:underline"
            >
              REVIEWS ({product.reviews.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <Accordion
              type="multiple"
              defaultValue={["item-1", "item-2"]}
              className="w-full mt-4"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>Specifications</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5">
                    <li>Weight: {product.weight} lb</li>
                    <li>
                      Dimensions: {product.dimensions.width}&quot; x{" "}
                      {product.dimensions.height}&quot; x{" "}
                      {product.dimensions.depth}&quot;
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Warranty and Shipping</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5">
                    <li>Warranty: {product.warrantyInformation}</li>
                    <li>Shipping: {product.shippingInformation}</li>
                    <li>Return Policy: {product.returnPolicy}</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="reviews">
            {product.reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              <ul className="list-disc pl-5 mt-4">
                {product.reviews.map((review, idx) => (
                  <li
                    key={`${review.date}-${review.reviewerName}-${idx}`}
                    className="mb-2"
                  >
                    <p className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                    <p>Rating: {review.rating} ⭐</p>
                    <p className="font-semibold">{review.reviewerName}</p>
                    <p>{review.comment}</p>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>
        </Tabs>
      </ContentWrapper>
    </article>
  );
}
