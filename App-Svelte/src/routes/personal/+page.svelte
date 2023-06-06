<script lang="ts">
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { sessionValid, sessionToken, sessionRole } from '../../store';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import { Icon, Pencil, PresentationChartLine } from 'svelte-hero-icons';
	import { load } from '../+page';
	import Cookies from 'js-cookie';

	let selectedImage: string = '';

	let token: string;
	let personal: { first_name: any; last_name: any; email: any; image: any} | null = null;

	const file_url ='https://sdh-server.crabdance.com/files/'
	let image_url = ''

	sessionToken.subscribe((v) => {
		token = v;
	});

	onMount(() => {
		loadData();
	});

	function loadData() {
		axios
			.get('https://sdh-server.crabdance.com/api/personal', {
				headers: {
					Authorization: token,
				}
			})
			.then((response) => {
				console.log(response.data);
				personal = response.data
				if(personal?.image !== ""){
					image_url = file_url + personal?.image;
				}
				
			})
			.catch((error) => {
				console.error('Error loading patient data:', error);
			});
	}

	function logout() {
		Cookies.remove('auth');
		sessionValid.set(false);
		sessionToken.set('');
		sessionRole.set('');
		goto('/login');
	}

	function handleFileInput(event: Event) {
		const fileInput = event.target as HTMLInputElement;
		const file = fileInput.files?.[0];

		if (
			file &&
			file.type.startsWith('image/') &&
			/\.(png|jpg|jpeg)$/.test(file.name) &&
			file.size < 3 * 1024 * 1024
		) {
			const reader = new FileReader();
			reader.onload = (e) => {
				selectedImage = e.target?.result as string;
			};
			reader.readAsDataURL(file);

			const formData = new FormData();
			formData.append('image', file);
			uploadImage(formData);
		} else {
			toast.error('Image bigger than 3Mb or invalid file type');
		}
	}

	async function uploadImage(formData: FormData) {
		axios.put('https://sdh-server.crabdance.com/api/personal', formData, {
			headers: {
				Authorization: token,
				'Content-Type': 'multipart/form-data'
			}
		}).then((response) => {
				loadData()
		})
		.catch((error) => {
			console.error(error);
		});
	}


</script>

<Toaster />
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
				{#if image_url}
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img src={image_url} alt="Selected Image" class="w-20 h-20 rounded-full" />
					<label
						for="fileEdit"
						on:change={handleFileInput}
						class=" absolute bg-blue-600 hover:bg-blue-700 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center translate-x-6 translate-y-6"
					>
						<Icon src={Pencil} solid mini class="w-4 h-4"></Icon>
						<span class="sr-only">Icon description</span>
					</label>
					<input
					type="file"
					id="fileEdit"
					class="sr-only"
					accept="image/png, image/jpeg"
					on:change={handleFileInput}
					/>
				{:else}<label
						for="fileInput"
						class="text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center cursor-pointer"
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
					</label>{/if}
				<input
					type="file"
					id="fileInput"
					class="sr-only"
					accept="image/png, image/jpeg"
					on:change={handleFileInput}
				/>
			</div>
			<div>
				<p class="text font-medium">{personal?.first_name} {personal?.last_name}</p>
				<!-- Name -->
				<p class="text-sm text-gray-500">{personal?.email}</p>
				<!-- Email -->
			</div>
		</div>
		<p class="mx-auto font-light italic">Your recipies will appear here</p>

		<p>
			<!--{token}-->
		</p>
	</div>
</div>
