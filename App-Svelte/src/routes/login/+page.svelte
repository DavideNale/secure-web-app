<script lang="ts">
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { sessionValid, sessionToken } from '../../store';
	import toast, { Toaster } from 'svelte-french-toast';
	import Cookies from 'js-cookie';

	let email: string;
	let password: string;

	let showOTP = false;

	let otp = '';

	function handleOTP(event: any) {
		const inputValue = event.target.value;
		// Only allow numbers and limit to 6 digits
		const sanitizedValue = inputValue.replace(/\D/g, '').slice(0, 6);
		const formattedValue = sanitizedValue.replace(/(\d{3})(?=\d)/g, '$1 ');
		otp = formattedValue;
	}

	function verifyOTP() {
		axios
			.post('https://sdh-server.crabdance.com/api/otp', { email, password, otp })
			.then((response) => {
				switch (response.status) {
					case 200:
						Cookies.set('auth', JSON.stringify(response.data), {
							expires: 1 / 24,
							secure: true,
							sameSite: 'strict'
						});
						sessionToken.set(response.data.token);
						sessionValid.set(true);
						if (response.data.role == 'patient') {
							goto('/personal');
						}
				}
			})
			.catch((error) => {
				toast.error('Server error');
			});
	}

	function login() {
		axios
			.post('https://sdh-server.crabdance.com/api/login', { email, password })
			.then((response) => {
				switch (response.status) {
					case 201:
						if (response.data.role == 'doctor') {
							Cookies.set('auth', JSON.stringify(response.data), {
								expires: 1 / 24,
								secure: true,
								sameSite: 'strict'
							});
							sessionToken.set(response.data.token);
							sessionValid.set(true);
							goto('/');
						} else {
							showOTP = true;
						}
						break;
					case 204:
						toast.error('Incorrect Credentials');
						break;
					default:
						break;
				}
			})
			.catch((error) => {
				toast.error('Internal Server Error');
			});
	}
</script>

<Toaster />
<section class="bg-gray-50">
	<div class="flex flex-col items-center justify-center mx-auto h-screen lg:py-0">
		<div class="w-full bg-white shadow-sm rounded-lg border md:mt-0 sm:max-w-md xl:p-0">
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				{#if !showOTP}
					<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
						Sign in to your account
					</h1>
					<form class="space-y-4 md:space-y-6" on:submit|preventDefault={login}>
						<div>
							<label for="email" class="block mb-2 text-sm font-medium text-gray-900"
								>Your email</label
							>
							<input
								bind:value={email}
								type="email"
								name="email"
								id="email"
								class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
								placeholder="name@company.com"
								required
							/>
						</div>
						<div>
							<label for="password" class="block mb-2 text-sm font-medium text-gray-900"
								>Password
							</label>
							<input
								bind:value={password}
								type="password"
								name="password"
								id="password"
								placeholder="••••••••"
								class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
								required
							/>
						</div>
						<div class="flex items-center justify-between" />
						<button
							type="submit"
							class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg px-5 py-2.5 text-center"
							>Log in</button
						>
						<p class="text-sm font-light text-gray-500">
							Don't have an account yet? <a
								href="/register"
								class="font-medium text-blue-600 hover:underline">Register</a
							>
						</p>
					</form>
				{:else}
					<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
						OTP Verification
					</h1>
					<div id="otp" class="flex flex-row justify-center text-center px-2 mt-5">
						<input
							type="text"
							class="input-field bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-32 p-2.5"
							bind:value={otp}
							on:input={handleOTP}
						/>
					</div>
					<button
						on:click={verifyOTP}
						class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg px-5 py-2.5 text-center"
						>Log in</button
					>
				{/if}
			</div>
		</div>
	</div>
</section>
