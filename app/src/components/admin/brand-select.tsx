"use client";

import { useState } from "react";
import { Combobox, ComboboxOption } from "../combobox";

export default function BrandSelect({ initialValue, className }: { initialValue?: string, className: string }) {

    const [value, setValue] = useState("");

    const brands: string[] = [
        "Apple",
        "Asus",
        "Huawei",
        "Lenovo",
        "Dell",
        "Amazon",
        "Beats",
        "TechGear",
        "GadgetMaster",
        "SnapTech",
        "ProVision",
        "Oppo",
        "Realme",
        "Samsung",
        "Vivo"
    ];

    function changeBrand(option: ComboboxOption) {
        setValue(option.label);
    }

    function addBrand(label: ComboboxOption['label']) {
        setValue(label);
    }

    return (
        <>
            <input type="hidden" id="brand" name="brand" value={value} />
            <Combobox
                options={
                    brands.map((brand) => {
                        return { value: brand.toLowerCase(), label: brand }
                    })
                }
                selected={initialValue ?? ""}
                onChange={changeBrand}
                onCreate={addBrand}
                className={className}
            />
        </>
    );
}