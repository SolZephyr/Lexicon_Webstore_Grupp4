"use client";

import { Delete } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { FormState, Product } from "@/lib/types";
import { ColumnDef, HeaderContext, Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const toSorted = (context: HeaderContext<Product, unknown>, title: string) => {
  const column = context.column;
  return (
    <Button
      variant="link"
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

const toPresent = (refStr: string) => {
  const refDate = new Date(refStr);
  const dateStr = refDate.toLocaleDateString("sv-SE");
  const timeStr = refDate.toLocaleTimeString("sv-SE");
  return `${dateStr} ${timeStr}`;
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: context => toSorted(context, "ID")
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
    accessorKey: "title",
    header: context => toSorted(context, "Title")
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
    accessorKey: "availabilityStatus",
    header: context => toSorted(context, "Available")
  },
  {
    accessorKey: "meta.createdAt",
    header: context => toSorted(context, "Created"),
    cell: ({ row }) => toPresent(row.original.meta.createdAt)
  },
  {
    accessorKey: "meta.updatedAt",
    header: context => toSorted(context, "Updated"),
    cell: ({ row }) => toPresent(row.original.meta.updatedAt)
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="bg-brand-600 h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="hover:bg-gray-200 hover:underline"
                asChild
              >
                <Link href={`admin/${product.id}`}>Show Details</Link>
              </DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem className="text-destructive focus:hover:bg-destructive/10 focus:text-destructive focus:underline">
                  Delete Product
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. Are you sure you want to
                permanently delete this file from our servers?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <ModalDelete id={product.id} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }
  }
];

function ModalDelete({ id }: { id: number }) {
  const initState: FormState = { result: "init" };
  const [state, formAction, isPending] = useActionState(Delete, initState);
  const message = state.result === "error" && state.message;
  const { refresh } = useRouter();
  useEffect(() => {
    if (state.result === "success") {
      toast.success(`Product with id ${id} deleted successfully`);
      refresh();
    }
  }, [id, refresh, state]);

  return (
    <form action={formAction}>
      {message && (
        <p className="border-destructive p-3 text-destructive">{message}</p>
      )}
      <input type="hidden" value={id} name="id" />
      <Button variant={"destructive"} disabled={isPending} type="submit">
        Delete
      </Button>
    </form>
  );
}
