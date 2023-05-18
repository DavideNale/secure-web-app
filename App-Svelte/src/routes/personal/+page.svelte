<script lang="ts">
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { sessionValid, sessionToken } from '../../store';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	let token: string;

	let isEditing: boolean = false;
	let id = '';
	let firstname = '';
	let lastname = '';
	let email = '';

	let ava = false;

	sessionToken.subscribe((v) => {
		token = v;
	});

	let patients: any = [];
	let filteredPatients = patients;
	let searchQuery: string = '';

	function logout() {
		sessionValid.set(false);
		sessionToken.set('');
		goto('/login');
	}

	onMount(() => {
		loadData();
	});

	$: filteredPatients = patients.filter((patient: any) => {
		const fullName = `${patient.first_name} ${patient.last_name}`.toLowerCase();
		return (
			fullName.includes(searchQuery.toLowerCase()) ||
			patient.email.toLowerCase().includes(searchQuery.toLowerCase())
		);
	});

	function loadData() {
		axios
			.get('https://sdh-server.crabdance.com/api/patients', {
				headers: {
					Authorization: token
				}
			})
			.then((response) => {
				patients = response.data;
			})
			.catch((error) => {
				console.error(error);
			});
	}
</script>

<div class="flex flex-col h-screen">
	<!-- navabar -->
	<nav class="bg-white border-b">
		<!-- logo and links -->
		<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
			<img src="svelte.svg" alt="" class="h-8" />
			<button class="font-bold text-blue-600 hover:underline" on:click={logout}>Logout</button>
		</div>
	</nav>

	<!--under navbar -->
	<div class="flex flex-col flex-1 bg-gray-100 overflow-y-hidden">
		<div class="flex mx-auto bg-white rounded-lg w-96 h-32 border m-8 mb-4 items-center p-4">
			<div class="flex items-center justify-center w-20 h-20 mr-4">
				<button
					type="button"
					class="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>

					<span class="sr-only">Icon description</span>
				</button>
			</div>
			<div>
				<p class="text font-medium">John Doe</p>
				<!-- Name -->
				<p class="text-sm text-gray-500">john.doe@example.com</p>
				<!-- Email -->
			</div>
		</div>
		<p class="mx-auto font-light italic">Your recipies will appear here</p>
	</div>
</div>
