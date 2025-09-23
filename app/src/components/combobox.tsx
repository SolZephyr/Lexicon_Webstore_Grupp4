"use client";

import { useEffect, useState } from 'react';
import { Check, ChevronsUpDown, CirclePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export type ComboboxOption = {
  value: string;
  label: string;
};

interface ComboboxProps {
  options: ComboboxOption[];
  selected: ComboboxOption['value'];
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (option: ComboboxOption) => void;
  onCreate?: (label: ComboboxOption['label']) => void;
}

/**
 * CommandItem to create a new query content
 */
function CommandAddItem({
  query,
  onCreate,
}: {
  query: string;
  onCreate: () => void;
}) {
  return (
    <div
      tabIndex={0}
      onClick={onCreate}
      onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
          onCreate();
        }
      }}
      className={cn(
        'flex w-full text-blue-500 cursor-pointer text-sm px-2 py-1.5 rounded-sm items-center focus:outline-none',
        'hover:bg-blue-200 focus:!bg-blue-200'
      )}
    >
      <CirclePlus className="mr-2 h-4 w-4" />
      Create `{query}`
    </div>
  );
}

// https://stackblitz.com/edit/shadcn-combobox-example?file=app%2Fpage.tsx
export function Combobox({
  options,
  selected,
  className,
  placeholder,
  disabled,
  onChange,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [value, setValue] = useState('');

  const [canCreate, setCanCreate] = useState(true);
  useEffect(() => {
    // Cannot create a new query if it is empty or has already been created
    // Unlike search, case sensitive here.
    const isAlreadyCreated = !options.some((option) => option.label === query);
    setCanCreate(!!(query && isAlreadyCreated));
  }, [query, options]);

  function handleSelect(option: ComboboxOption) {
    if (onChange) {
      setValue(option.label);
      onChange(option);
      setOpen(false);
      setQuery('');
    }
  }

  function handleCreate() {
    if (onChange && query) {
      setValue("Add: " + query);
      onChange({ value: query.toLowerCase(), label: query });
      setOpen(false);
      setQuery('');
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="cursor-pointer">
        <Button
          type="button"
          variant="outline"
          role="combobox"
          disabled={disabled ?? false}
          aria-expanded={open}
          className={cn('w-full font-normal', className)}
        >
          {selected && selected.length > 0 ? (
            <div className="truncate mr-auto">
              {options.find((item) => item.value === selected)?.label}
            </div>
          ) : (
            <div className="text-slate-600 mr-auto">
              {(value) ? value : (placeholder ?? 'Select')}
            </div>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-[500px] p-0">
        <Command>
          <CommandInput
            placeholder="Search or create new"
            value={query}
            onValueChange={(value: string) => setQuery(value)}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Enter') {
                // Avoid selecting what is displayed as a choice even if you press Enter for the conversion
                // Note that if you do this, you can select a choice with the arrow keys and press Enter, but it will not be selected
                event.preventDefault();
              }
            }}
          />
          <CommandEmpty className="flex pl-1 py-1 w-full">
            {query && (
              <CommandAddItem query={query} onCreate={() => handleCreate()} />
            )}
          </CommandEmpty>

          <CommandList>
            <CommandGroup className="overflow-y-auto">
              {/* No options and no query */}
              {/* Even if written as a Child of CommandEmpty, it may not be displayed only the first time, so write it in CommandGroup. */}
              {options.length === 0 && !query && (
                <div className="py-1.5 pl-8 space-y-1 text-sm">
                  <p>No items</p>
                  <p>Enter a value to create a new one</p>
                </div>
              )}

              {/* Create */}
              {canCreate && (
                <CommandAddItem query={query} onCreate={() => handleCreate()} />
              )}

              {/* Select */}
              {options.map((option) => (
                <CommandItem
                  key={option.label}
                  tabIndex={0}
                  value={option.label}
                  onSelect={() => handleSelect(option)}
                  onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
                    if (event.key === 'Enter') {
                      // Process to prevent onSelect from firing, but it does not work well with StackBlitz.
                      event.stopPropagation();
                      handleSelect(option);
                    }
                  }}
                  className={cn(
                    'cursor-pointer',
                    // Override CommandItem class name
                    'focus:!bg-blue-200 hover:!bg-blue-200 aria-selected:bg-transparent'
                  )}
                >
                  {/* min to avoid the check icon being too small when the option.label is long. */}
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4 min-h-4 min-w-4',
                      selected === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
