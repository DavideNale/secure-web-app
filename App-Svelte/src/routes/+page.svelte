<script>
	import { sessionValid, sessionToken } from '../store';
	
		/**
	 * @type {string}
	 */
		let token ;


	sessionToken.subscribe(v => {
		token = v;
	});

</script>

<div class="flex flex-col h-screen">
	<!-- navabar -->
	<nav class="bg-white border-b">
		<!-- logo and links -->
		<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
			<img src="svelte.svg" alt="" class="h-8" />
			<p>{token} {sessionValid}</p>
			<a href="/login" class="font-bold text-blue-600 hover:underline">Logout</a>
		</div>
	</nav>

	<!--under navbar -->
	<div class="flex flex-row flex-1 bg-gray-100">
		<div class="flex-grow mx-auto bg-red-100 overflow-y-scroll mx-auto">
			<!-- Your main content here -->
			<div class=" bg-blue-100 mx-auto">ppppppppppppppppppppp</div>
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
