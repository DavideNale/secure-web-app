<script>
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';

	import '../app.postcss';
	import { sessionValid, sessionToken, sessionRole } from '../store';
	import { goto } from '$app/navigation';
	import Cookies from 'js-cookie';
	import { redirect } from '@sveltejs/kit';
	import { page } from '$app/stores';

	let shouldLoad = false;

	beforeUpdate(() => {
		shouldLoad = false;
		if ($page.url.pathname === '/login' || $page.url.pathname === '/register') {
			shouldLoad = true;
			return;
		}
		const authCookie = Cookies.get('auth');

		if (authCookie === undefined) {
			return goto('/login');
		} else {
			const cookieValue = Cookies.get('auth');
			if (cookieValue !== undefined) {
				const parsedCookie = JSON.parse(cookieValue);
				sessionToken.set(parsedCookie.token);
				sessionValid.set(true);
				sessionRole.set(parsedCookie.role);
				if ($page.url.pathname === '/personal' && parsedCookie.role === 'doctor') {
					return goto('/login');
				}
				if ($page.url.pathname === '/' && parsedCookie.role === 'patient') {
					return goto('/login');
				}
				shouldLoad = true;
			}
		}
	});
</script>

{#if shouldLoad}
	<slot />
{/if}
