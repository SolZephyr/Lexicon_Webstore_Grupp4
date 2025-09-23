"use client";
import DimensionInput from "@/components/admin/dimensions";
import WarrantySelect from "@/components/admin/warranty-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/lib/constants";
import { Partial, Product } from "@/lib/types";
import React, { FormEvent, useState } from "react";
import { NumberInput } from "./number-input";
import BrandSelect from "./brand-select";

export default function ProductForm({
  initialState,
  onSubmit
}: {
  initialState: Partial<Product>;
  onSubmit: (newState: Product) => void;
}) {
  const originalState = structuredClone(initialState);
  const [product, setProduct] = useState<Partial<Product>>(originalState);

  function submitProduct(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const finalProduct = product as Product;
    onSubmit(finalProduct);
  }

  const setValue = (index: keyof Product, value: any) => {
    setProduct({ ...product, [index]: value });
  };

  const { title, category, brand, description } = product;

  return (
    <form
      onSubmit={submitProduct}
      className="m-auto max-w-[50rem] flex p-4 flex-col gap-5"
    >
      <h2 className="text-4xl font-bold">Create New Product</h2>
      <div className=" flex flex-wrap gap-8">
        <FormRow>
          {/* Basic information */}
          <FormSection>
            <FormField name={"title"} label={"Title"}>
              <Input
                type="text"
                id="title"
                name="title"
                defaultValue={title}
                onChange={val => setValue("title", val.currentTarget.value)}
                placeholder="Product name"
                maxLength={50}
              />
            </FormField>
            <FormField name="category" label="Category">
              <Select
                name="category"
                defaultValue={category}
                onValueChange={v => setValue("category", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((item, index) => (
                    <SelectItem key={index} value={item.label}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField name="brand" label="Brand">
              <BrandSelect
                initialValue={brand}
                onChange={e => setValue("brand", e)}
              />
            </FormField>
            <FormField name="description" label={"Description"}>
              <Textarea
                id="description"
                name="description"
                value={description ?? ""}
                onChange={val =>
                  setValue("description", val.currentTarget.value)
                }
                rows={5}
              />
            </FormField>
          </FormSection>
          {/* Extra information */}
          <FormSection>
            <FormField name={"number"} label={"Weight"}>
              <Input
                type="number"
                id="weight"
                name="weight"
                defaultValue={product.weight ?? 0}
                onChange={v => setValue("weight", v.currentTarget.value)}
                min={1}
                step={1}
              />
            </FormField>
            <FormField name="price" label="Price">
              <NumberInput
                id="price"
                name="price"
                value={product.price}
                onChange={v => setValue("price", v)}
                placeholder="0.00"
                decimalScale={2}
                prefix="$"
                thousandSeparator={true}
                allowNegative={false}
              />
            </FormField>
            <FormField name="discount" label="Discount (percentage)">
              <NumberInput
                id="discount"
                name="discount"
                value={product.discountPercentage}
                onChange={v => setValue("discountPercentage", v)}
                placeholder="0.00"
                decimalScale={2}
                suffix="%"
                min={0}
                max={100}
              />
            </FormField>
            <FormField name="stock" label="Stock (Amount)">
              <Input
                type="number"
                id="stock"
                name="stock"
                defaultValue={product.stock ?? 0}
                onChange={e => setValue("stock", e.currentTarget.value)}
                min={0}
                max={999}
                step={1}
              />
            </FormField>
            <FormField name="warranty" label="Warranty">
              <WarrantySelect
                onChange={w => setValue("warrantyInformation", w)}
                initialValue={product.warrantyInformation}
              />
            </FormField>
          </FormSection>
        </FormRow>
        <FormRow>
          <FormSection>
            <DimensionInput
              onUpdates={d => {
                setValue("dimensions", d);
              }}
              initialValues={product.dimensions}
            />
          </FormSection>
        </FormRow>
      </div>
      <section className="py-4">
        <Button type="submit" size="lg" className="cursor-pointer">
          Add product
        </Button>
      </section>
    </form>
  );
}

const FormRow = ({ children }: React.ComponentProps<"div">) => (
  <div className="grid sm:grid-cols-2 grid-cols-1 justify-evenly grow gap-4 ">
    {children}
  </div>
);

const FormSection = ({ children }: React.ComponentProps<"div">) => {
  return <div className={`col justify-start space-y-4`}>{children}</div>;
};

export const FormField = ({
  name,
  label,
  children
}: {
  name?: string;
  label: string;
} & React.ComponentProps<"div">) => {
  return (
    <div className="flex flex-col gap-2 grow">
      <Label className="capitalize" htmlFor={name}>
        {label}
      </Label>
      {children}
    </div>
  );
};
