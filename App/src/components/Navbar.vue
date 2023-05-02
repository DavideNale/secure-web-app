<template>
    <nav class="bg-white border-gray-200 border-b-[1.5px]">
        <div class="flex flex-wrap items-center justify-between mx-auto p-6 px-8">
            <a class="flex items-center">
                <img src="/vite.svg" class="h-8 mr-3" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap">Secure Web App</span>
            </a>
                <a @click="logout" class="font-medium text-blue-600 hover:underline">Logout</a>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    methods: {
        logout() {
            this.$store.commit('logIn', { value: false, token: '' });
        }
    }
}
</script>