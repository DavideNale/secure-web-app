<template>
    <div class="flex flex-col h-screen">
        <Navbar></Navbar>
        <div class="flex-grow bg-black">
            <div class="flex flex-col-reverse md:flex-row h-full">
                <!-- main content -->
                <div class="flex-grow bg-gray-100 w-full p-6">
                    <!-- search bar -->
                    <SearchBar />
                    <!-- table -->
                    <PatientsTable />

                </div>
                <!-- side bar -->
                <div class="flex-none w-full md:w-96 bg-white md:border-l-[1.5px] border-b-[1.5px]">
                    <!-- input form -->
                    <PatientInput />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import PatientInput from './components/PatientInput.vue';
import PatientsTable from './components/PatientsTable.vue'
import SearchBar from './components/SearchBar.vue';

export default {
    components: {
        Navbar,
        PatientInput,
        PatientsTable,
        SearchBar,
    },
}
</script>