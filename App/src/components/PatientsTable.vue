<template>
    <div>
        <div class="relative md:w-96 md:mx-auto mb-6">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"></path>
                </svg>
            </div>
            <input type="text" id="voice-search" v-model="search"
                class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Search Patient Name" required>
        </div>
    </div>
    <div class=" rounded-lg border">
        <table class="w-full text-sm text-left text-gray-500">

            <thead class="text-xs text-gray-700 uppercase sticky top-0 bg-gray-50">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        First Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Last Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Actions
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr class="bg-white border-b" v-for="patient in patientsData" :key="patient.id">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ patient.first_name }}
                    </th>
                    <td class="px-6 py-4">
                        {{ patient.last_name }}
                    </td>
                    <td class="px-6 py-4">
                        {{ patient.email }}
                    </td>
                    <td class=" py-4">
                        <button type="button" @click="editP(patient)"
                            class="text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2">
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>

                            <span class="sr-only">Icon description</span>
                        </button>
                        <button type="button" @click="deleteP(patient.id)"
                            class="text-red-700 bg-red-50 hover:bg-red-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2">
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>

                            <span class="sr-only">Icon description</span>
                        </button>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            env: 'https://sdh-server.crabdance.com/api',
            patient: {
                id: "",
                firstname: "",
                lastname: "",
                email: "",
            },
            search: "",
        }
    },
    computed: {
        patientsData() {
            return this.$store.getters.getPatientsData.filter(patient =>
                patient.first_name.toLowerCase().includes(this.search.toLowerCase()) ||
                patient.last_name.toLowerCase().includes(this.search.toLowerCase()) ||
                patient.email.toLowerCase().includes(this.search.toLowerCase())
            );
        },
    },
    mounted() {
        this.loadData();
    },
    methods: {
        
        editP(pat) {
            this.$store.commit('setPat', pat)
        },
        deleteP(id) {
            axios
                .delete('https://sdh-server.crabdance.com/api/patients/' + id,{
                        headers: {
                            'Authorization': this.$store.state.JWT
                        }
                    })
                .then((response) => {
                    this.$store.commit('setPatientsData', response.data)
                })
                .catch((e) => {
                    this.errors.push(e);
                });
        },
        loadData() {
            axios.get('https://sdh-server.crabdance.com/api/patients',{
                        headers: {
                            'Authorization': this.$store.state.JWT
                        }
                    })
                .then(response => {
                    this.$store.commit('setPatientsData', response.data)
                })
                .catch(error => {
                    // Handle any errors here
                    console.error(error);
                });
        },
    }
}
</script>