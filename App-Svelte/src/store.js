import { onMount } from "svelte";
import { writable } from "svelte/store";

export const sessionValid = writable(false);
export const sessionToken = writable('');
export const sessionRole = writable('');
export const cookieExists = writable(false);
