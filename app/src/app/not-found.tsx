import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grow flex justify-center items-center w-full bg-white rounded min-h-[40rem]">
      <div className="flex flex-col w-min  items-center p-10 gap-10">
        <h2 className="text-3xl font-bold">Not Found</h2>
        <p className="w-96 text-center rounded p-2">
          The page you were looking for could not be found.
        </p>
        <Button asChild className="bg-primary-green hover:bg-primary-green/80">
          <Link className="self-center" href="/">
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
