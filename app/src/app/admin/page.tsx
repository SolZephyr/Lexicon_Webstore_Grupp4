import { getFullProductsByFilter } from "@/lib/data/products";
import TableLoader from "./table-loader";
import { Suspense } from "react";
import Loader from "@/components/loader";

export default async function AdminPage() {
  const task = getFullProductsByFilter({ limit: 100 });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-bold">AdminPage</h1>
      <Suspense fallback={<Loader />}>
        <TableLoader task={task} />
      </Suspense>
    </div>
  );
}
