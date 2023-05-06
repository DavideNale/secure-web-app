<template>
    <div>
        <div class="w-full md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="" ref="InputForm">
                    <div>
                        <label for="fname" class="block mb-2 text-sm font-medium text-gray-900 ">First
                            Name</label>
                        <input type="text" name="" id="fname" v-model="patient.firstname"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                            placeholder="Name" required>
                    </div>
                    <div>
                        <label for="sname" class="block mb-2 text-sm font-medium text-gray-900 ">Second
                            Name</label>
                        <input type="text" name="" id="sname" v-model="patient.lastname"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                            placeholder="Surname" required>
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                        <input type="email" name="email" id="email" v-model="patient.email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                            placeholder="name@company.com" required>
                    </div>
                    <!--
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••"
                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                            required>
                    </div>
                    -->
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
                    <div class="w-full flex space-x-4">
                        <button v-if="this.isEditing" @click="cancelEdit"
                            class="w-full text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Cancel</button>
                        <button @click="submitP"
                            class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{{
                                isEditing ? 'Save' : 'Add Patient' }}</button>

                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            env: 'https://sdh-server.crabdance.com/api',
            isEditing: false,
            patient: {
                id: "",
                firstname: "",
                lastname: "",
                email: "",
            },
        }
    },
    computed: {
        pat() {
            return this.$store.state.pat
        }
    },
    watch: {
        'pat'(newPat, oldPat) {
            this.updateContent(newPat)
        }
    },
    methods: {
        updatePatient() {
            axios.put('https://sdh-server.crabdance.com/api/patients/' + this.patient.id, this.patient,{
                        headers: {
                            'Authorization': this.$store.state.JWT
                        }
                    })
                .then((response) => {
                    this.$store.commit('setPatientsData', response.data)
                })
                .catch((error) => {
                    console.error(error);
                });
            this.$refs.InputForm.reset();
            this.patient = {
                id: "",
                firstname: "",
                lastname: "",
                email: "",
            };
            this.isEditing = false;
        },
        cancelEdit() {
            this.isEditing = false
            this.patient = {
                id: "",
                firstname: "",
                lastname: "",
                email: "",
            }
            this.$refs.InputForm.reset();
        },
        updateContent(pat) {
            this.$refs.InputForm.reset();
            this.patient.id = pat.id;
            this.patient.firstname = pat.first_name;
            this.patient.lastname = pat.last_name;
            this.patient.email = pat.email;
            this.isEditing = true;
        },
        submitP() {
            if(this.isEditing){
                this.updateContent();
                return;
            }
            axios.post('https://sdh-server.crabdance.com/api/patients', this.patient,{
                        headers: {
                            'Authorization': this.$store.state.JWT
                        }
                    })
                .then(response => {
                    if (response.status == 201) {
                        this.$store.commit('setPatientsData', response.data)
                        this.patient = {
                            id: "",
                            firstname: "",
                            lastname: "",
                            email: "",
                        }
                        this.$refs.InputForm.reset();
                    } else {
                        // 
                    }

                })
                .catch(error => {
                });

        }
    }
};
</script>