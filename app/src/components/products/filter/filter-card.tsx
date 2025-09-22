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
      <AccordionTrigger className="font-bold text-base hover:cursor-pointer py-1.5">{title}</AccordionTrigger>
      <AccordionContent className="">{children}</AccordionContent>
    </AccordionItem>
  );
}
