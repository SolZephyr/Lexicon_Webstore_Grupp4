"use server"

import { editProduct, postProduct } from "@/lib/data/products";
import { FormState } from "@/lib/types";
import { formToObject } from "@/lib/utils";
import { entryForm } from "@/lib/validations/product";

export async function Create(state: FormState, data: FormData): Promise<FormState> {
    const item = formToObject(data);
    const parse = await entryForm.safeParseAsync(item);

    if (!parse.success) {
        return {
            result: 'error', errors: parse.error.issues.reduce((acc: Record<string, string>, issue) => {
                const field = Array.isArray(issue.path) ? issue.path.join('_') : issue.path;
                acc[field] = issue.message;
                return acc;
            }, {})
        }
    }
    try {
        const request = await postProduct(parse.data);
        switch (request.result) {
            case 'success':
                return { ...request, 'action': 'CREATE' }
            case 'error':
                return { result: request.result, message: 'Product could not be added' }
        }
    } catch (error) {
        console.error("Error creating product:", error);
        return { result: 'error', message: "Failed to create product. Please try again." };
    }
}

export async function Edit(state: FormState, data: FormData): Promise<FormState> {
    const item = formToObject(data);
    const parse = await entryForm.safeParseAsync(item);
    const itemId = state.result === 'init' && state.id;
    if (!itemId)
        return { result: 'error', message: 'No ID provided' }

    if (!parse.success) {
        return {
            result: 'error', errors: parse.error.issues.reduce((acc: Record<string, string>, issue) => {
                const field = Array.isArray(issue.path) ? issue.path.join('_') : issue.path;
                acc[field] = issue.message;
                return acc;
            }, {})
        }
    }

    try {
        const request = await editProduct(itemId, parse.data);
        switch (request.result) {
            case 'success':
                return { ...request, action: 'UPDATE' }
            case 'error':
                return { result: request.result, message: request.exception }
        }
    } catch (error) {
        console.error("Error updating product:", error);
        return { result: 'error', message: "Failed to update product. Please try again." };
    }
}