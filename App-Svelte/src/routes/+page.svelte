<script lang="ts">
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { sessionValid, sessionToken } from '../store';
	import { onMount } from 'svelte';

	let token: string;

	sessionToken.subscribe((v) => {
		token = v;
	});

	let patients: any = [];
	let filteredPatients = patients;
	let searchQuery: string = "";

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

<div class="flex flex-col h-screen overflow-y-hidden">
	<!-- navabar -->
	<nav class="bg-white border-b">
		<!-- logo and links -->
		<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
			<img src="svelte.svg" alt="" class="h-8" />
			<!-- search bar -->
			<div class="relative md:w-96 md:mx-auto mb-6">
				<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg
						aria-hidden="true"
						class="w-5 h-5 text-gray-500"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fill-rule="evenodd"
							d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<input
					bind:value={searchQuery}
					type="text"
					id="voice-search"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
					placeholder="Search Patient Name"
					required
				/>
			</div>
			<p class="overflow-y-hidden w-12">{token} {sessionValid}</p>
			<button class="font-bold text-blue-600 hover:underline" on:click={logout}>Logout</button>
		</div>
	</nav>

	<!--under navbar -->
	<div class="flex flex-row flex-1 bg-gray-100">
		<div class="flex-grow mx-auto bg-red-100">
			<!-- Your main content here -->
			<table class="w-full text-sm text-left text-gray-500">
				<thead class="text-xs text-gray-700 uppercase sticky top-0 bg-gray-50">
					<tr>
						<th scope="col" class="px-6 py-3"> First Name </th>
						<th scope="col" class="px-6 py-3"> Last Name </th>
						<th scope="col" class="px-6 py-3"> Email </th>
						<th scope="col" class="px-6 py-3"> Actions </th>
					</tr>
				</thead>

				<tbody>
					{#each filteredPatients as patient}
						<tr class="bg-white border-b">
							<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
								{patient.first_name}
							</th>
							<td class="px-6 py-4">
								{patient.last_name}
							</td>
							<td class="px-6 py-4">
								{patient.email}
							</td>
							<td class=" py-4">
								<button
									type="button"
									class="text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2"
								>
									<svg
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										class="w-4 h-4"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
										/>
									</svg>

									<span class="sr-only">Icon description</span>
								</button>
								<button
									type="button"
									class="text-red-700 bg-red-50 hover:bg-red-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2"
								>
									<svg
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="2"
										stroke="currentColor"
										class="w-4 h-4"
									>
										<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
									</svg>

									<span class="sr-only">Icon description</span>
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<nav class="text-white flex-none w-2/6 h-full right-0">
			<!-- Your sidebar content here -->
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8 max-w-sm bg-white rounded-md border mt-10">
				<form class="space-y-4 md:space-y-6">
					<div>
						<label for="fname" class="block mb-2 text-sm font-medium text-gray-900"
							>First Name</label
						>
						<input
							type="text"
							name=""
							id="fname"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
							placeholder="Name"
							required
						/>
					</div>
					<div>
						<label for="sname" class="block mb-2 text-sm font-medium text-gray-900"
							>Second Name</label
						>
						<input
							type="text"
							name=""
							id="sname"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
							placeholder="Surname"
							required
						/>
					</div>
					<div>
						<label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
							placeholder="name@company.com"
							required
						/>
					</div>
					<div class="flex items-start">
						<div class="flex items-center h-5">
							<input
								id="terms"
								aria-describedby="terms"
								type="checkbox"
								class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
								required
							/>
						</div>
						<div class="ml-3 text-sm">
							<label for="terms" class="font-light text-gray-500"
								>I <a class="font-medium text-blue-600 hover:underline" href="#">Reviewed</a>
								the data</label
							>
						</div>
					</div>
					<button
						class="w-full text-white bg-blue-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center"
						>Add Patient</button
					>
				</form>
			</div>
		</nav>
	</div>
</div>
