import { writable } from "svelte/store";

export const sessionValid = writable();
export const sessionToken = writable("ss");
