import { writable } from "svelte/store";

export const sessionValid = writable(false);
export const sessionToken = writable("");
