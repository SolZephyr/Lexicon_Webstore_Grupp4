"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import { ColumnDef, HeaderContext, Row } from "@tanstack/react-table";

const toSorted = (context: HeaderContext<Product, unknown>, title: string) => {
  const column = context.column;
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
    </Button>
  );
};

const getRebatedValue = (row: Row<Product>) => {
  const price = row.original.price;
  const discountValue = row.original.discountPercentage;

  return discountValue
    ? +(price - (price * discountValue) / 100).toFixed(2)
    : price;
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: context => toSorted(context, "ID")
  },
  {
    accessorKey: "title",
    header: context => toSorted(context, "Title")
  },
  {
    accessorKey: "category",
    header: context => toSorted(context, "Category"),
    cell: ({ row }) => {
      const category = row.getValue("category")?.toString();
      return category
        ?.split("-")
        .map(i => {
          const [first, ...rest] = i;
          return first.toUpperCase() + rest.join("");
        })
        .join(" ");
    }
  },
  {
    accessorKey: "price",
    header: context => toSorted(context, "Price"),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(amount);
      return formatted;
    }
  },
  {
    accessorKey: "priceWithRebate",
    size: 10,
    header: context => toSorted(context, "Price (incl. Discount)"),
    sortingFn: (rowA, rowB) => {
      return getRebatedValue(rowA) - getRebatedValue(rowB);
    },
    cell: ({ row }) => {
      const amount = getRebatedValue(row);
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(amount);

      return formatted;
    }
  },
  {
    accessorKey: "sku",
    header: context => toSorted(context, "SKU")
  },
  {
    accessorKey: "availabilityStatus",
    header: context => toSorted(context, "Available")
  },
  {
    accessorKey: "meta.createdAt",
    header: context => toSorted(context, "Created"),
    cell: ({ row }) =>
      new Date(row.original.meta.createdAt).toLocaleDateString("sv-SE")
  },
  {
    accessorKey: "meta.updatedAt",
    header: context => toSorted(context, "Updated"),
    cell: ({ row }) =>
      new Date(row.original.meta.updatedAt).toLocaleDateString("sv-SE")
  }
];
