<template>
    <Login v-if="!isAuth"/>
    <Home v-else/>
</template>

<script>
import Login from './Login.vue';
import Home from './Home.vue';

export default {
    components: {
        Login,
        Home,
    },
    computed: {
        isAuth() {
            return this.$store.state.isLoggedIn
        }
    }
}
</script>