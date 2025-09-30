import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Star, StarHalf } from "lucide-react";

export default function ProductRating({
  rating,
  showTooltip,
  showLabel,
}: {
  rating: number;
  showTooltip?: boolean;
  showLabel?: boolean;
}) {
  const safeRating = Math.max(0, Math.min(5, rating));

  if (safeRating === 0) {
    return <span className="text-xs text-muted-foreground">No Rating</span>;
  }

  const fullStars = Math.floor(safeRating);
  const hasHalf = safeRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  const Stars = (
    <div className={cn("flex items-center gap-0.5 text-yellow-500", showTooltip && "py-2")}>
      
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={16} fill="currentColor" />
      ))}
      {hasHalf && (
        <div className="relative w-4 h-4">
          <Star
            size={16}
            fill="none"
            strokeWidth={1.5}
            className="absolute top-0 left-0"
          />
          <StarHalf
            size={16}
            fill="currentColor"
            strokeWidth={0}
            className="absolute top-0 left-0"
          />
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={16} fill="none" strokeWidth={1.5} />
      ))}
      {showLabel && (
        <span className="text-sm text-muted-foreground ml-1">{safeRating}</span>
      )}
    </div>
  );

  if (!showTooltip) {
    return Stars;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{Stars}</TooltipTrigger>
        <TooltipContent>
          <p>{safeRating} / 5</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
