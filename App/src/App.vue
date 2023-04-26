<!-- APP -->
<template>
  <div v-if="!isLoggedIn">
    <Login/>
    </div>
    <div v-if="isLoggedIn">
      <Login/> 
    </div>
</template>

<!-- SCRIPThttps://sdh-server.crabdance.com/api/patients/ -->
<script>
import Login from './Login.vue';
export default {
    data() {
        return {
            env: "http://localhost:3000/patients/",
            isLoggedIn: false,
        };
    },
    mounted() {
    },
    computed: {},
    methods: {},
    components: { Login }
};
</script>
