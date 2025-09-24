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
import { FormState, Partial, Product } from "@/lib/types";
import React, { useActionState, useState } from "react";
import { NumberInput } from "./number-input";
import BrandSelect from "./brand-select";

export default function ProductForm({
  submitButtonText,
  initialState,
  serverAction
}: {
  submitButtonText: string;
  initialState: Partial<Product>;
  serverAction: (prevState: FormState, data: FormData) => Promise<FormState>;
}) {
  const originalState = structuredClone(initialState);
  const [product, setProduct] = useState<Partial<Product>>(originalState);

  const setValue = (index: keyof Product, value: unknown) => {
    setProduct({ ...product, [index]: value });
  };
  const formState: FormState = { success: true };

  const [state, formAction, isPending] = useActionState(
    serverAction,
    formState
  );

  return (
    <form
      action={formAction}
      className='m-auto max-w-[50rem] flex p-4 flex-col gap-5'
    >
      <h2 className='text-4xl font-bold'>Create New Product</h2>
      <pre className='border block text-wrap '>{JSON.stringify(state)}</pre>
      <div className=' flex flex-wrap space-y-4'>
        <FormRow>
          {/* Basic information */}
          <FormSection>
            <FormField name={"title"} label={"Title"} required>
              <Input
                type='text'
                id='title'
                name='title'
                defaultValue={product.title}
                onChange={val => setValue("title", val.currentTarget.value)}
                placeholder='Product name'
                maxLength={50}
              />
            </FormField>
            <FormField name='category' label='Category' required>
              <Select
                name='category'
                defaultValue={product.category}
                onValueChange={v => setValue("category", v)}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Category' />
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
            <FormField name='brand' label='Brand' required>
              <BrandSelect
                initialValue={product.brand}
                onChange={e => setValue("brand", e)}
              />
            </FormField>
            <FormField name='description' label={"Description"}>
              <Textarea
                id='description'
                name='description'
                value={product.description ?? ""}
                placeholder='Describe the product...'
                onChange={val =>
                  setValue("description", val.currentTarget.value)
                }
                rows={5}
              />
            </FormField>
          </FormSection>
          {/* Extra information */}
          <FormSection>
            <FormField name={"weight"} label={"Weight"}>
              <NumberInput
                id='weight'
                name='weight'
                value={product.weight}
                placeholder='0.00'
                onChange={value => {
                  setValue("weight", value);
                }}
                min={1}
                step={1}
              />
            </FormField>
            <FormField name='price' label='Price'>
              <NumberInput
                id='price'
                name='price'
                value={product.price}
                onChange={v => setValue("price", v)}
                placeholder='0.00'
                decimalScale={2}
                prefix='$'
                thousandSeparator={true}
                allowNegative={false}
              />
            </FormField>
            <FormField name='discount' label='Discount (percentage)'>
              <NumberInput
                id='discount'
                name='discount'
                value={product.discountPercentage}
                onChange={v => setValue("discountPercentage", v)}
                placeholder='0.00'
                decimalScale={2}
                suffix='%'
                min={0}
                max={100}
              />
            </FormField>
            <FormField name='stock' label='Stock (Amount)'>
              <Input
                type='number'
                id='stock'
                name='stock'
                defaultValue={product.stock ?? 0}
                onChange={e => setValue("stock", e.currentTarget.value)}
                min={0}
                max={999}
                step={1}
              />
            </FormField>
            <FormField name='warranty' label='Warranty'>
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
      <section className='py-4'>
        <Button
          type='submit'
          disabled={isPending}
          size='lg'
          className='cursor-pointer'
        >
          {submitButtonText}
        </Button>
      </section>
    </form>
  );
}

const FormRow = ({ children }: React.ComponentProps<"div">) => (
  <div className='grid sm:grid-cols-2 grid-cols-1 justify-evenly grow gap-4 '>
    {children}
  </div>
);

const FormSection = ({ children }: React.ComponentProps<"div">) => {
  return <div className={`col justify-start space-y-4`}>{children}</div>;
};

export const FormField = ({
  name,
  label,
  required,
  children
}: {
  name?: string;
  label: string;
  required?: boolean;
} & React.ComponentProps<"div">) => {
  return (
    <div className='flex flex-col grow gap-2'>
      <Label
        className='capitalize flex flex-row gap-0 relative w-fit'
        htmlFor={name}
      >
        {label}
        {required && (
          <span className='text-destructive absolute -right-2 -top-0.5'>*</span>
        )}
      </Label>
      {children}
    </div>
  );
};
