import { getFullProductsByFilter } from "@/lib/data/products";
import { Suspense } from "react";
import Loader from "@/components/loader";
import TableLoader from "@/components/admin/table-loader";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
  const task = getFullProductsByFilter({ limit: 100 });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-bold">AdminPage</h1>
      <div className="flex flex-start">
        <Button variant={"brand"} asChild>
          <Link href="/admin/create">Create Product</Link>
        </Button>
      </div>
      <Suspense fallback={<Loader />}>
        <TableLoader task={task} />
      </Suspense>
    </div>
  );
}
