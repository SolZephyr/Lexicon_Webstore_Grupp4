import { ElementType, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type ContentWrapperProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & ComponentPropsWithoutRef<T>;

export function ContentWrapper<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContentWrapperProps<T>) {
  const Component = as || "div";
  return (
    <Component className={cn("rounded p-4 bg-white", className)} {...props} />
  );
}
