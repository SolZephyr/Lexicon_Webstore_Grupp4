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
import React, { useActionState, useEffect, useState } from "react";
import { NumberInput } from "./number-input";
import ShippingInfoSelect from "./shipping-info-select";
import { AddableSelect } from "../addable-select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { localDatetime } from "@/lib/utils";

export default function ProductForm({
  submitButtonText,
  initialState,
  brands,
  serverAction
}: {
  submitButtonText: string;
  initialState: Partial<Product>;
  brands: { brand: string[] };
  serverAction: (prevState: FormState, data: FormData) => Promise<FormState>;
}) {
  const originalData = structuredClone(initialState);
  const [form, setForm] = useState<Partial<Product>>(originalData);
  const { replace } = useRouter();

  const setValue = (index: keyof Product, value: unknown) => {
    setForm({ ...form, [index]: value });
  };

  const initState: FormState = { result: "init" };
  const categoryValues = categories.map(v => ({
    value: v.label.toLowerCase().split(" ").join("-"),
    label: v.label
  }));

  const [state, formAction, isPending] = useActionState(
    serverAction,
    initState
  );

  const errors = state && state?.result === "error" ? state.errors : undefined;
  const formError = (name: string) => (errors ? errors?.[name] : undefined);

  const errorCSS = (name: string) =>
    formError(name) ? "formError" : undefined;

  useEffect(() => {
    if (state.result === "success") {
      toast.success("Product created!");
      replace(`/admin/${state.id}`);
    }
  }, [replace, state]);

  return (
    <form
      action={formAction}
      className='m-auto max-w-[50rem] flex p-4 flex-col gap-5'
    >
      <h2 className='text-4xl font-bold'>{form.id ? "Edit Product" : "Add Product"}</h2>
      <div className="grid md:grid-cols-[1fr_200px]">
        <div className='flex flex-wrap space-y-4'>
          <FormRow>
            {/* Basic information */}
            <FormSection>
              <FormField
                name={"title"}
                label={"Title"}
                error={formError("title")}
              >
                <Input
                  type='text'
                  id='title'
                  name='title'
                  className={errorCSS("title")}
                  defaultValue={form.title}
                  onChange={val => setValue("title", val.currentTarget.value)}
                  placeholder='Product name'
                  maxLength={50}
                  required
                />
              </FormField>
              <FormField
                name='category'
                label='Category'
                error={formError("category")}
              >
                <Select
                  name='category'
                  defaultValue={form.category}
                  onValueChange={v => setValue("category", v)}
                  required
                >
                  <SelectTrigger className={`w-full ${errorCSS("category")}`}>
                    <SelectValue placeholder='Category' />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryValues.map((item, index) => (
                      <SelectItem key={index} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
              <FormField name='brand' label='Brand' error={formError("brand")}>
                <AddableSelect
                  id='brand'
                  name='brand'
                  defaultValue={form.brand}
                  options={brands.brand}
                  onValueChange={e => setValue("brand", e)}
                />
              </FormField>
              <FormField
                name='description'
                label={"Description"}
                error={formError("description")}
              >
                <Textarea
                  id='description'
                  name='description'
                  className={errorCSS("description")}
                  value={form.description ?? ""}
                  placeholder='Describe the product...'
                  onChange={val =>
                    setValue("description", val.currentTarget.value)
                  }
                  rows={5}
                  required
                />
              </FormField>
            </FormSection>
            {/* Extra information */}
            <FormSection>
              <FormField
                name={"weight"}
                label={"Weight"}
                error={formError("weight")}
              >
                <NumberInput
                  id='weight'
                  name='weight'
                  className={errorCSS("weight")}
                  value={form.weight}
                  placeholder='0.00'
                  required
                  onChange={value => {
                    setValue("weight", value);
                  }}
                  min={1}
                  step={1}
                />
              </FormField>
              <FormField name='price' label='Price' error={formError("price")}>
                <NumberInput
                  id='price'
                  name='price'
                  className={errorCSS("price")}
                  value={form.price}
                  onChange={v => setValue("price", v)}
                  placeholder='$0.00'
                  decimalScale={2}
                  prefix='$'
                  required
                  thousandSeparator={true}
                  allowNegative={false}
                />
              </FormField>
              <FormField
                name='discount'
                label='Discount (percentage)'
                error={formError("discount")}
              >
                <NumberInput
                  id='discount'
                  name='discount'
                  className={errorCSS("discount")}
                  value={form.discountPercentage}
                  onChange={v => setValue("discountPercentage", v)}
                  placeholder='0.00%'
                  decimalScale={2}
                  suffix='%'
                  min={0}
                  max={100}
                />
              </FormField>
              <FormField
                name='stock'
                label='Stock (Amount)'
                error={formError("stock")}
              >
                <Input
                  type='number'
                  id='stock'
                  name='stock'
                  className={errorCSS("stock")}
                  placeholder='0'
                  defaultValue={form.stock ?? 0}
                  onChange={e => setValue("stock", e.currentTarget.value)}
                  min={0}
                  max={999}
                  step={1}
                />
              </FormField>
              <FormField
                name='warranty'
                label='Warranty'
                error={formError("warranty")}
              >
                <WarrantySelect
                  className={errorCSS("warranty")}
                  onChange={w => setValue("warrantyInformation", w)}
                  initialValue={form.warrantyInformation}
                />
              </FormField>
            </FormSection>
          </FormRow>
          <FormRow>
            <FormSection>
              <DimensionInput
                errors={errors}
                onUpdates={d => {
                  setValue("dimensions", d);
                }}
                initialValues={form.dimensions}
              />
            </FormSection>
            <FormSection>
              <FormField
                name='shipping'
                label='Shipping'
                error={formError("shipping")}
              >
                <ShippingInfoSelect
                  initialValue={form.shippingInformation}
                  onChange={w => setValue("shippingInformation", w)}
                  className={errorCSS("shipping")}
                />
              </FormField>
            </FormSection>
          </FormRow>
        </div>
        <FormMeta id={form.id} created={form.meta?.createdAt} updated={form.meta?.updatedAt} submitBtn={{ isPending, submitButtonText }} />
      </div>
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
        <span className={`relative capitalize ${error && "text-destructive"}`}>
          {label}
        </span>
        <span className='text-destructive text-sm py-0'>{error}</span>
      </Label>
      {children}
    </div>
  );
};

export const FormMeta = (
  { id, created, updated, submitBtn }:
    { id: number | undefined, created: string | undefined, updated: string | undefined, submitBtn?: { isPending: boolean, submitButtonText: string } }) => {
  return (
    <section className="flex flex-col justify-start gap-4 border border-black rounded p-4 mt-8 md:ml-8 md:mt-0">
      <div className='flex flex-col gap-2'>
        <Label className='flex justify-between h-5' htmlFor="meta-id">
          <span>ID</span>
        </Label>
        <span id="meta-id">{id ?? "Not set"}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1">
        <div className='flex flex-col gap-1'>
          <Label className='flex justify-between h-5' htmlFor="meta-created">
            <span>Created</span>
          </Label>
          <span id="meta-created">{created ? localDatetime(created) : "Not set"}</span>
        </div>
        <div className='flex flex-col gap-1'>
          <Label className='flex justify-between h-5' htmlFor="meta-updated">
            <span>Updated</span>
          </Label>
          <span id="meta-updated">{updated ? localDatetime(updated) : "Not set"}</span>
        </div>
      </div>
      {submitBtn ?
        <div className='flex flex-col gap-1 mt-auto'>
          <Button
            type='submit'
            disabled={submitBtn.isPending}
            size='lg'
            className='cursor-pointer'
          >
            {submitBtn.submitButtonText}
          </Button>
        </div>
        : ""}
    </section>
  );
}