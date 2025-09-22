"use client";
import { Product, ProductList } from "@/lib/types";
import React, { use } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function TableLoader({ task }: { task: Promise<ProductList> }) {
  const { products } = use(task);
  return <DataTable columns={columns} data={products} />;
}
