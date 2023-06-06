import { redirect } from '@sveltejs/kit';
import { sessionRole, sessionToken, sessionValid } from '../store.js';
import { get } from 'svelte/store';
import { goto } from '$app/navigation';
import Cookies from 'js-cookie';

export const ssr = false;

export async function load({ }) {
    if (get(sessionValid) == false) {
        throw redirect(303, '/login')
    }
}