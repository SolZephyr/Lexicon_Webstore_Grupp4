"use server"

import { postProduct } from "@/lib/data/products";
import { FormState } from "@/lib/types";
import { formToObject } from "@/lib/utils";
import { entryForm } from "@/lib/validations/product";
import { redirect } from "next/navigation";

export async function Create(state: FormState, data: FormData): Promise<FormState> {
    const item = formToObject(data);
    const parse = await entryForm.safeParseAsync(item);
    const { success, error, data: parsedData } = parse;

    if (error)
        return {
            success, errors: error.issues.reduce((acc: Record<string, string>, issue) => {
                const field = Array.isArray(issue.path) ? issue.path.join('_') : issue.path;
                acc[field] = issue.message;
                return acc;
            }, {})
        }

    const request = await postProduct(parsedData);

    if (request.status)
        redirect(`/admin/${request.id}`);

    return { success: request.status, message: request.error }

}

export async function Edit(state: FormState, data: FormData): Promise<FormState> {
    console.dir(data)
    const item = formToObject(data);
    const parse = await entryForm.safeParseAsync(item);
    const { success, error, data: parsedData } = parse;

    if (error)
        return {
            success, errors: error.issues.reduce((acc: Record<string, string>, issue) => {
                const field = Array.isArray(issue.path) ? issue.path.join('_') : issue.path;
                acc[field] = issue.message;
                return acc;
            }, {})
        }
    return { success: true }
}