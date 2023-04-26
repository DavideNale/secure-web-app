<template>
    <section class="bg-gray-100">
        <div class="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 v-if="isLogginIn" class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Sign in to your account
                    </h1>
                    <h1 v-else class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Register your new account
                    </h1>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="submitLogin">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your
                                email</label>
                            <input type="email" name="email" id="email" v-model="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                placeholder="name@company.com" required>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" name="password" v-model="password" id="password" placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 
                                                                " required>
                        </div>
                        <div class="flex items-center justify-between">
                            <!--
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox"
                                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                                        required>
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-gray-500 ">Remember me</label>
                                </div>
                            </div>
                            <a href="#" class="text-sm font-medium text-blue-600 hover:underline">Forgot
                                password?</a>-->
                        </div>
                        <button type="submit" v-if="isLogginIn"
                            class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign
                            in</button>
                        <button type="submit" v-else
                            class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Register</button>
                        <p v-if="isLogginIn" class="text-sm font-light text-gray-500">
                            Don’t have an account yet? <a @click="modeSwitch"
                                class="font-medium text-blue-600 hover:underline">Register</a>
                        </p>
                        <p v-else class="text-sm font-light text-gray-500">
                            Already have an account? <a @click="modeSwitch"
                                class="font-medium text-blue-600 hover:underline">Sign in</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import bcrypt from 'bcryptjs';
import axios from 'axios';

export default {
    data() {
        return {
            isLogginIn: true,
            email: "",
            password: "",
        };
    },
    mounted() {
    },
    methods: {
        modeSwitch() {
            this.isLogginIn = !this.isLogginIn;
        },
        submitLogin() {
            if (this.email !== '' && this.password !== '') {
                if (this.isLogginIn) {
                    // log in
                    // Load hash from your password DB.
                    //var salt = bcrypt.genSaltSync(10);
                    //var hash = bcrypt.hashSync(this.password, salt);

                    axios.post('/login', {email: this.email, password: this.password})
                        .then(response => {
                            console.log(response.data); // Output: "true" or "false"
                        })
                        .catch(error => console.error(error));
                } else {
                    // register
                }
            }
        },
    },
};
</script>