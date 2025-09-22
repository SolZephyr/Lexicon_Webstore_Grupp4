import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grow flex justify-center items-center ">
      <div className="flex flex-col w-min bg-white items-center rounded p-10 gap-10">
        <h2 className="text-4xl">Not Found</h2>
        <p className="w-50 rounded p-2">
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
