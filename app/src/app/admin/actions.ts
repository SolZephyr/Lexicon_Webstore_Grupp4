"use server"

import { FormState } from "@/lib/types";

export async function Create(state: FormState, data: FormData): Promise<FormState> {
    console.dir(data);
    await new Promise(resolve => {
        setTimeout(resolve, 1000);
    });
    return { success: true }
}

export async function Edit(state: FormState, data: FormData): Promise<FormState> {
    console.dir(data);
    return { success: true }
}