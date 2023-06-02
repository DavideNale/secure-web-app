import { redirect } from '@sveltejs/kit';
import { sessionValid } from '../store.js';
import { get } from 'svelte/store';
import { goto } from '$app/navigation';

export const ssr = false;

export async function load({ }) {
    // check if logged in
    // check which role
    // only doctor can access the doctor page
    // only patients can access the personal page
    if (get(sessionValid) == false) {
        throw redirect(303, '/login')
    }
}