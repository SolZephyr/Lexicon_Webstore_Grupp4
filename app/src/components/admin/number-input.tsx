"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface NumberInputProps
  extends Omit<React.ComponentProps<"input">, "type" | "value" | "onChange"> {
  value?: number;
  onChange?: (value: number | undefined) => void;
  decimalScale?: number;
  allowNegative?: boolean;
  thousandSeparator?: boolean;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
}

function NumberInput({
  className,
  value,
  onChange,
  decimalScale = 2,
  allowNegative = true,
  thousandSeparator = false,
  prefix = "",
  suffix = "",
  min,
  max,
  ...props
}: NumberInputProps) {
  const [displayValue, setDisplayValue] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);

  // Format number for display
  const formatNumber = React.useCallback(
    (num: number | undefined): string => {
      if (num === undefined || isNaN(num)) return "";

      let formatted = num.toFixed(decimalScale);

      if (thousandSeparator) {
        const parts = formatted.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        formatted = parts.join(".");
      }

      return `${prefix}${formatted}${suffix}`;
    },
    [decimalScale, thousandSeparator, prefix, suffix]
  );

  // Parse display value to number
  const parseNumber = React.useCallback(
    (str: string): number | undefined => {
      if (!str) return undefined;

      // Remove prefix, suffix, and thousand separators
      let cleaned = str.replace(
        new RegExp(`^${prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`),
        ""
      );
      cleaned = cleaned.replace(
        new RegExp(`${suffix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`),
        ""
      );
      cleaned = cleaned.replace(/,/g, "");

      const num = Number.parseFloat(cleaned);
      return isNaN(num) ? undefined : num;
    },
    [prefix, suffix]
  );

  // Update display value when value prop changes
  React.useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatNumber(value));
    }
  }, [value, formatNumber, isFocused]);

  // Initialize display value
  React.useEffect(() => {
    setDisplayValue(formatNumber(value));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDisplayValue(inputValue);
    const numericValue = parseNumber(inputValue);

    // Validate constraints
    if (numericValue !== undefined) {
      if (!allowNegative && numericValue < 0) return;
      if (min !== undefined && numericValue < min) return;
      if (max !== undefined && numericValue > max) return;

      // Check decimal places
      const decimalPart = inputValue.split(".")[1];
      if (decimalPart && decimalPart.length > decimalScale) return;
    }

    onChange?.(numericValue);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    // Show raw number without formatting when focused
    if (value !== undefined) {
      setDisplayValue(value.toString());
    }
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    // Format the number when focus is lost
    setDisplayValue(formatNumber(value));
    props.onBlur?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter
    if (
      [8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      return;
    }

    // Ensure that it is a number or decimal point and stop the keypress
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105) &&
      e.keyCode !== 190 &&
      e.keyCode !== 110
    ) {
      // Allow minus sign if negative numbers are allowed
      if (!(allowNegative && e.keyCode === 189)) {
        e.preventDefault();
      }
    }

    props.onKeyDown?.(e);
  };

  return (
    <input
      {...props}
      type='text'
      inputMode='decimal'
      value={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      data-slot='input'
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary w-full selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
    />
  );
}

export { NumberInput };
