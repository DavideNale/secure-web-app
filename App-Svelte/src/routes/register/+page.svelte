<script lang="ts">
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import bcrypt from 'bcryptjs';
	import zxcvbn from 'zxcvbn';
	import toast, { Toaster } from 'svelte-french-toast';
	import qrcode from 'qrcode';

	let strength = 0;
	let strengthLevel = '';

	let first_name = '';
	let last_name = '';
	let email = '';
	let password = '';

	function register() {
		if (strength > 0) {
			var salt = bcrypt.genSaltSync(10);
			var hash = bcrypt.hashSync(password, salt);
			var data = {
				first_name,
				last_name,
				email,
				hash
			};
			axios
				.post('https://sdh-server.crabdance.com/api/register', data)
				.then((response) => {
					if (response.status == 201) {
						toast.success('Successfully registered');
						setTimeout(() => goto('/login'), 1000);
					}
				})
				.catch((error) => {
					console.error(error);
					toast.error('Something went wrong');
				});
		}
	}

	function checkPasswordStrength() {
		if (password === '') {
			strength = 0;
			return;
		}

		const result = zxcvbn(password);
		strength = result.score;
		strengthLevel = getStrengthLabel(strength);
	}

	function getStrengthLabel(strength: any) {
		switch (strength) {
			case 0:
				return '(Too weak)';
			case 1:
				return '(Weak)';
			case 2:
				return '(Fair)';
			case 3:
				return '(Strong)';
			case 4:
				return '(Very strong)';
			default:
				return '';
		}
	}
</script>

<Toaster />
<section class="bg-gray-50">
	<div class="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
		<div class="w-full bg-white shadow-sm rounded-lg border md:mt-0 sm:max-w-md xl:p-0">
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
					Register your new account
				</h1>
				<form class="space-y-4 md:space-y-6" on:submit|preventDefault={register}>
					<div>
						<label for="first-name" class="block mb-2 text-sm font-medium text-gray-900"
							>First Name</label
						>
						<input
							bind:value={first_name}
							type="text"
							name="first-name"
							id="first-name"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
							placeholder="name"
							required
						/>
					</div>
					<div>
						<label for="last-name" class="block mb-2 text-sm font-medium text-gray-900"
							>Last Name</label
						>
						<input
							bind:value={last_name}
							type="text"
							name="last-name"
							id="last-name"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
							placeholder="surname"
							required
						/>
					</div>
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
							<span class="italic text-gray-600 font-sm">{strengthLevel}</span>
						</label>
						<input
							bind:value={password}
							on:input={checkPasswordStrength}
							type="password"
							name="password"
							id="password"
							placeholder="••••••••"
							class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
							required
						/>
					</div>
					<div>
						<label for="confirm-terms" class="flex items-center">
							<input
								type="checkbox"
								name="confirm-terms"
								id="confirm-terms"
								class="form-checkbox text-blue-600 h-4 w-4 rounded-sm border-gray-300 focus:ring-blue-600"
								required
							/>
							<span class="ml-2 text-sm text-gray-900"
								>I have read and agree to the terms and conditions</span
							>
						</label>
					</div>
					<p>d</p>
					<div class="flex items-center justify-between" />
					<button
						type="submit"
						class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg px-5 py-2.5 text-center"
						>Register</button
					>
					<p class="text-sm font-light text-gray-500">
						Already have an account? <a
							href="/login"
							class="font-medium text-blue-600 hover:underline">Sign in</a
						>
					</p>
				</form>
			</div>
		</div>
	</div>
</section>
