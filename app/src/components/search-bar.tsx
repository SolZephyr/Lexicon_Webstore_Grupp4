import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { redirect, RedirectType } from "next/navigation";

async function SearchBar() {
  return (
    <div className="full-width bg-primary-green">
      <div className={`rounded-b py-4  flex items-center justify-evenly`}>
        <SearchForm />
        <ul className="grow text-sm font-semibold text-white justify-evenly hidden md:flex">
          <li className="hidden xl:flex">Free shipping worldwide</li>
          <li className="hidden lg:flex">Protected payments</li>
          <li className="hidden md:flex">Easy 30-day return policy</li>
        </ul>
      </div>
    </div>
  );
}

const SearchForm = () => {
  "use client";
  const categories = [
    "all",
    "smartphones",
    "tablets",
    "mobile-accessories",
    "laptops",
  ];

  async function handleSearch(data: FormData) {
    "use server";
    const type = data.get("type");
    const name = data.get("productName");

    if (name) {
      const category = type ? type.toString() : "";
      redirect(
        `/products?search=${name.toString()}&categories=${category}`,
        RedirectType.push
      );
    }
  }
  return (
    <form
      role="search"
      aria-label="Product Search"
      className="flex flex-row rounded-3xl pe-1 bg-white items-center focus-within:outline-3 grow outline-green-800"
      action={handleSearch}
    >
      <Select
        name="type"
        defaultValue="all"
        required
        aria-label="Select category"
      >
        <SelectTrigger
          className="ps-4 font-semibold ring-0 outline-0 focus-visible:ring-0 border-0 cursor-pointer"
          aria-label="Select category"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category, index) => {
            const capitalized = category
              .split("-")
              .map((split) => {
                const [firstLetter, ...rest] = split;
                return [firstLetter.toUpperCase(), ...rest].join("");
              })
              .join(" ");
            return (
              <SelectItem key={index} value={category}>
                {capitalized}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <label htmlFor="search-input" className="sr-only">
        Search products
      </label>
      <Input
        id="search-input"
        type="search"
        name="productName"
        className="outline-0 focus-visible:ring-0 border-0 text-sm"
        placeholder="Search Anything..."
      />
      <Button
        variant={"ghost"}
        className="hover:bg-primary-green hover:text-white rounded-2xl h-7 cursor-pointer"
        type="submit"
        aria-label="Search"
      >
        <Search aria-hidden="true" />
      </Button>
    </form>
  );
};

export default SearchBar;
