<template>
    <div class="">
        <div class="w-full md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form class="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label for="fname" class="block mb-2 text-sm font-medium text-gray-900 ">First
                            Name</label>
                        <input type="text" name="" id="fname"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                            placeholder="Name" required>
                    </div>
                    <div>
                        <label for="sname" class="block mb-2 text-sm font-medium text-gray-900 ">Second
                            Name</label>
                        <input type="text" name="" id="sname"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                            placeholder="Surname" required>
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                        <input type="email" name="email" id="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                            placeholder="name@company.com" required>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                            required>
                    </div>
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input id="terms" aria-describedby="terms" type="checkbox"
                                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                                required>
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="terms" class="font-light text-gray-500">I <a
                                    class="font-medium text-blue-600 hover:underline" href="#">Reviewed</a>
                                the
                                data</label>
                        </div>
                    </div>
                    <button type="submit"
                        class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add
                        Patient</button>
                </form>
            </div>
        </div>
    </div>
</template>