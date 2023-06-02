<script>
	import { onMount } from 'svelte';

	import '../app.postcss';
	import { sessionValid, sessionToken } from '../store';

	onMount(() => {
		console.log('funzione');
	});
</script>

<slot />
