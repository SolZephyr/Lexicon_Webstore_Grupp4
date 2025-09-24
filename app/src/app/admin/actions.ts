"use server"

import { FormState } from "@/lib/types";
import { formToProduct } from "@/lib/utils";
import { create as entryProduct } from "@/lib/validations/product";
import z from "zod";

export async function Create(state: FormState, data: FormData): Promise<FormState> {
    const item = formToProduct(data);
    const p = await entryProduct.safeParseAsync(item);
    const errors = p.error;
    if (errors) {
        const formattedErrors = p.error.issues.reduce((acc: Record<string, string>, issue) => {
            const field = Array.isArray(issue.path) ? issue.path.join('_') : issue.path;
            acc[field] = issue.message;
            return acc;
        }, {});

        return {
            success: p.success, errors: formattedErrors
        }
    }
    await new Promise(resolve => {
        setTimeout(resolve, 1000);
    });
    return { success: p.success }
}

export async function Edit(state: FormState, data: FormData): Promise<FormState> {
    return { success: true }
}