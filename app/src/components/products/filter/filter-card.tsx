import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

export default function FilterCard({
  id,
  title,
  children,
  className,
  ...props
}: { title: string } & React.ComponentProps<"div">) {
  return (
    <AccordionItem
      value={id!}
      className={`${className}`}
      {...props}
    >
      <AccordionTrigger className="px-2 font-bold hover:cursor-pointer">{title}</AccordionTrigger>
      <AccordionContent className="px-1">{children}</AccordionContent>
    </AccordionItem>
  );
}
