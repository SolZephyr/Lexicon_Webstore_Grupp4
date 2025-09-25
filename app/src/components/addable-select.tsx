"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddableSelectProps {
  options: string[];
  value?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  onAddItem?: (item: string) => void;
  className?: string;
  name?: string;
  id?: string;
}

export function AddableSelect({
  options: initialOptions,
  value,
  placeholder = "Select an option...",
  onValueChange,
  onAddItem,
  className,
  name,
  id
}: AddableSelectProps) {
  const [options, setOptions] = useState(initialOptions);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItemValue, setNewItemValue] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showAddOption =
    searchTerm &&
    !filteredOptions.some(
      option => option.toLowerCase() === searchTerm.toLowerCase()
    );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsAddingNew(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex(0);
      }
      return;
    }

    const totalItems = filteredOptions.length + (showAddOption ? 1 : 0);

    switch (e.key) {
      case "Escape":
        setIsOpen(false);
        setIsAddingNew(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
        break;
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex(prev => {
          if (prev === -1) return 0;
          return (prev + 1) % totalItems;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex(prev => {
          if (prev === -1) return totalItems - 1;
          return prev <= 0 ? totalItems - 1 : prev - 1;
        });
        break;
      case "Enter":
        e.preventDefault();
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length
        ) {
          handleSelect(filteredOptions[highlightedIndex]);
        } else if (
          highlightedIndex === filteredOptions.length &&
          showAddOption
        ) {
          handleAddNew();
        } else if (filteredOptions.length === 1 && highlightedIndex === -1) {
          handleSelect(filteredOptions[0]);
        } else if (showAddOption && filteredOptions.length === 0) {
          handleAddNew();
        }
        break;
    }
  };

  const handleSelect = (option: string) => {
    onValueChange?.(option);
    setIsOpen(false);
    setSearchTerm("");
    setHighlightedIndex(-1);
  };

  const handleAddNew = () => {
    if (searchTerm.trim()) {
      setIsAddingNew(true);
      setNewItemValue(searchTerm.trim());
    }
  };

  const confirmAddNew = () => {
    if (newItemValue.trim()) {
      const newItem = newItemValue.trim();
      setOptions(prev => [...prev, newItem]);
      onAddItem?.(newItem);
      handleSelect(newItem);
      setIsAddingNew(false);
      setNewItemValue("");
    }
  };

  const cancelAddNew = () => {
    setIsAddingNew(false);
    setNewItemValue("");
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-card px-3 py-2 text-sm text-card-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          isOpen && "ring-2 ring-ring ring-offset-2"
        )}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-label={placeholder}
        id={id}
      >
        <span className={cn("truncate", !value && "text-muted-foreground")}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 opacity-50 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {name && <input type='hidden' name={name} value={value || ""} />}

      {isOpen && (
        <div className='absolute top-full z-50 mt-1 w-full rounded-md border border-border bg-popover shadow-lg'>
          <div className='p-2'>
            <input
              ref={inputRef}
              type='text'
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setHighlightedIndex(prev => {
                  const newFilteredLength = options.filter(option =>
                    option.toLowerCase().includes(e.target.value.toLowerCase())
                  ).length;
                  const newShowAdd =
                    e.target.value &&
                    !options.some(
                      option =>
                        option.toLowerCase() === e.target.value.toLowerCase()
                    );
                  const newTotalItems =
                    newFilteredLength + (newShowAdd ? 1 : 0);

                  if (prev >= newTotalItems) return newTotalItems > 0 ? 0 : -1;
                  return prev;
                });
              }}
              onKeyDown={handleKeyDown}
              placeholder='Search or type to add...'
              className='w-full rounded-sm border border-input bg-background px-2 py-1 text-sm text-foreground placeholder:text-muted-foreground'
            />
          </div>

          <ul
            ref={listRef}
            role='listbox'
            className='max-h-60 overflow-auto py-1'
          >
            {filteredOptions.map((option, index) => (
              <li
                key={option}
                role='option'
                aria-selected={value === option}
                className={cn(
                  "relative cursor-pointer select-none px-3 py-2 text-sm",
                  highlightedIndex === index &&
                    "bg-accent text-accent-foreground",
                  value === option && "bg-primary text-primary-foreground"
                )}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}

            {showAddOption && (
              <li
                role='option'
                aria-selected
                className={cn(
                  "relative cursor-pointer select-none px-3 py-2 text-sm",
                  highlightedIndex === filteredOptions.length &&
                    "bg-accent text-accent-foreground"
                )}
                onClick={handleAddNew}
              >
                <div className='flex items-center gap-2'>
                  <Plus className='h-4 w-4' />
                  <span>Add &quot;{searchTerm}&quot;</span>
                </div>
              </li>
            )}

            {filteredOptions.length === 0 && !showAddOption && (
              <li className='px-3 py-2 text-sm text-muted-foreground'>
                No options found
              </li>
            )}
          </ul>
        </div>
      )}

      {isAddingNew && (
        <div className='absolute top-full z-50 mt-1 w-full rounded-md border border-border bg-popover p-3 shadow-lg'>
          <div className='space-y-3'>
            <div>
              <label className='text-sm font-medium text-popover-foreground'>
                Add new item
              </label>
              <input
                type='text'
                value={newItemValue}
                onChange={e => setNewItemValue(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    confirmAddNew();
                  } else if (e.key === "Escape") {
                    cancelAddNew();
                  }
                }}
                className='mt-1 w-full rounded-sm border border-input bg-background px-2 py-1 text-sm text-foreground'
                autoFocus
              />
            </div>
            <div className='flex gap-2'>
              <button
                onClick={confirmAddNew}
                className='flex-1 rounded-sm bg-primary px-3 py-1 text-sm text-primary-foreground'
              >
                Add
              </button>
              <button
                onClick={cancelAddNew}
                className='flex items-center justify-center rounded-sm border border-border bg-background p-1'
              >
                <X className='h-4 w-4' />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
