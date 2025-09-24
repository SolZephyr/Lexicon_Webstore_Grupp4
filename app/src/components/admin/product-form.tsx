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
import ShippingInfoSelect from "./shipping-info-select";

export default function ProductForm({
  submitButtonText,
  initialState,
  serverAction
}: {
  submitButtonText: string;
  initialState: Partial<Product>;
  serverAction: (prevState: FormState, data: FormData) => Promise<FormState>;
}) {
  const originalData = structuredClone(initialState);
  const [form, setForm] = useState<Partial<Product>>(originalData);

  const setValue = (index: keyof Product, value: unknown) => {
    setForm({ ...form, [index]: value });
  };
  const formState: FormState = {};

  const [state, formAction, isPending] = useActionState(
    serverAction,
    formState
  );

  const e = (name: string) =>
    state.success ? undefined : state.errors?.[name];

  return (
    <form
      action={formAction}
      className='m-auto max-w-[50rem] flex p-4 flex-col gap-5'
    >
      <h2 className='text-4xl font-bold'>Create New Product</h2>
      <div className=' flex flex-wrap space-y-4'>
        <FormRow>
          {/* Basic information */}
          <FormSection>
            <FormField name={"title"} label={"Title"} error={e("title")}>
              <Input
                type='text'
                id='title'
                name='title'
                defaultValue={form.title}
                onChange={val => setValue("title", val.currentTarget.value)}
                placeholder='Product name'
                maxLength={50}
              />
            </FormField>
            <FormField name='category' label='Category' error={e("category")}>
              <Select
                name='category'
                defaultValue={form.category}
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
            <FormField name='brand' label='Brand' error={e("brand")}>
              <BrandSelect
                initialValue={form.brand}
                onChange={e => setValue("brand", e)}
              />
            </FormField>
            <FormField
              name='description'
              label={"Description"}
              error={e("description")}
            >
              <Textarea
                id='description'
                name='description'
                value={form.description ?? ""}
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
            <FormField name={"weight"} label={"Weight"} error={e("weight")}>
              <NumberInput
                id='weight'
                name='weight'
                value={form.weight}
                placeholder='0.00'
                onChange={value => {
                  setValue("weight", value);
                }}
                min={1}
                step={1}
              />
            </FormField>
            <FormField name='price' label='Price' error={e("price")}>
              <NumberInput
                id='price'
                name='price'
                value={form.price}
                onChange={v => setValue("price", v)}
                placeholder='0.00'
                decimalScale={2}
                prefix='$'
                thousandSeparator={true}
                allowNegative={false}
              />
            </FormField>
            <FormField
              name='discount'
              label='Discount (percentage)'
              error={e("discount")}
            >
              <NumberInput
                id='discount'
                name='discount'
                value={form.discountPercentage}
                onChange={v => setValue("discountPercentage", v)}
                placeholder='0.00'
                decimalScale={2}
                suffix='%'
                min={0}
                max={100}
              />
            </FormField>
            <FormField name='stock' label='Stock (Amount)' error={e("stock")}>
              <Input
                type='number'
                id='stock'
                name='stock'
                defaultValue={form.stock ?? 0}
                onChange={e => setValue("stock", e.currentTarget.value)}
                min={0}
                max={999}
                step={1}
              />
            </FormField>
            <FormField name='warranty' label='Warranty' error={e("warranty")}>
              <WarrantySelect
                onChange={w => setValue("warrantyInformation", w)}
                initialValue={form.warrantyInformation}
              />
            </FormField>
          </FormSection>
        </FormRow>
        <FormRow>
          <FormSection>
            <DimensionInput
              errors={state.errors}
              onUpdates={d => {
                setValue("dimensions", d);
              }}
              initialValues={form.dimensions}
            />
          </FormSection>
          <FormSection>
            <FormField name='shipping' label='Shipping' error={e("shipping")}>
              <ShippingInfoSelect
                initialValue={form.shippingInformation}
                onChange={w => setValue("shippingInformation", w)}
              />
            </FormField>
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
  error,
  children
}: {
  name?: string;
  label: string;
  error?: string;
} & React.ComponentProps<"div">) => {
  return (
    <div className='flex flex-col grow gap-1'>
      <Label className='flex justify-between h-5' htmlFor={name}>
        <span className='relative capitalize '>{label}</span>
        <span className='text-destructive text-sm py-0'>{error}</span>
      </Label>
      {children}
    </div>
  );
};
