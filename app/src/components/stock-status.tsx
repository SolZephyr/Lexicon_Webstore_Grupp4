import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Check, X, Minus } from "lucide-react";

interface StockStatusProps {
  amount: number;
  showLabel?: boolean;
  showTooltip?: boolean;
}

export default function StockStatus({
  amount,
  showLabel,
  showTooltip,
}: StockStatusProps) {
  let bgColor: string;
  let Icon: typeof Check;
  let label: string;

  if (amount > 7) {
    bgColor = "bg-green-500";
    Icon = Check;
    label = "In Stock";
  } else if (amount <= 7 && amount > 0) {
    bgColor = "bg-yellow-500";
    Icon = Minus;
    label = "Low Stock";
  } else {
    bgColor = "bg-red-500";
    Icon = X;
    label = "Out of Stock";
  }

  const content = (
    <span className="inline-flex items-center">
      <span
        className={cn(
          "w-4 h-4 rounded-full flex items-center justify-center",
          showLabel && "mr-1",
          bgColor
        )}
      >
        <Icon className="w-3 h-3 text-white" strokeWidth={2} />
      </span>
      {showLabel && label}
    </span>
  );

  return (
    <div className="text-sm text-gray-500 flex items-center p-1">
      {showTooltip ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{content}</TooltipTrigger>
            <TooltipContent>
              <p>
                {label} {amount > 0 ? `(${amount} left)` : ""}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        content
      )}
    </div>
  );
}
