"use server"

import { FormState } from "@/lib/types";
import { formToObject } from "@/lib/utils";
import { entryForm } from "@/lib/validations/product";

export async function Create(state: FormState, data: FormData): Promise<FormState> {
    const item = formToObject(data);
    const p = await entryForm.safeParseAsync(item);
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
    return { success: p.success }
}

export async function Edit(state: FormState, data: FormData): Promise<FormState> {
    return { success: true }
}