<!-- APP -->
<template>

  <div id="app">
    <!-- FORM -->
    <div class="mx-10 my-10 shadow-md border rounded-md">
      <form ref="myForm" @submit.prevent="submitForm">
        <div class="p-4">
          <label
            for="name"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Name
          </label>
          <input
            class="pl-4 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            v-model="patient.firstname"
            type="text"
            id="name"
            name="name"
            required
            placeholder="Enter you name"
          />

          <label
            for="surname"
            class="block text-sm font-medium leading-6 text-gray-900 mt-2"
          >
            Surname
          </label>
          <input
            class="pl-4 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            v-model="patient.lastname"
            type="text"
            id="surname"
            name="surname"
            required
            placeholder="Enter your surname"
          />

          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900 mt-2"
          >
            Email
          </label>
          <input
            class="pl-4 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            v-model="patient.email"
            type="email"
            id="email"
            name="email"
            required
            placeholder="example@domain.some"
          />

          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900 mt-2"
          >
            Password
          </label>
          <input
            class="pl-4 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            v-model="patient.password"
            type="password"
            id="password"
            name="password"
            required
            placeholder="password goes here!"
          />
        </div>
        <div class="bg-gray-50 px-4 py-3 text-right sm:px-6 flex flex-row">
          <div class="flex items-start">
            <div class="flex h-6 items-center">
              <input
                v-model="isChecked"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
              />
            </div>
            <div class="ml-3 text-sm leading-6">
              <label for="comments" class="font-medium text-gray-900">
                I accept to the terms and conditions
              </label>
            </div>
          </div>
          <!-- Original button with v-if directive -->
          <button
            v-if="!isEditing"
            class="ml-auto flex justify-center rounded-md bg-green-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
            :disabled="!isChecked"
            type="submit"
          >
            Submit
          </button>
          <!-- New buttons with v-if directive -->
          <div v-if="isEditing" class="ml-auto flex justify-end">
            <button
              class="mr-4 justify-center rounded-md bg-gray-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
              @click="cancelEdit"
            >
              New patient
            </button>
            <button
              class="justify-center rounded-md bg-cyan-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
              @click="saveEdit"
              :disabled="!isChecked"
            >
              Save
            </button>
          </div>
          <!--
          <input
            class="ml-auto flex justify-center rounded-md bg-green-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
            type="submit"
            value="Submit"
            @click="insert"
          />
          --->
        </div>
      </form>
    </div>

    <!-- TABLE -->
    <div class="flex flex-col mx-10 shadow-md border rounded-md">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full text-left text-sm font-light" id="mytable">
              <thead>
                <tr class="border-b dark:border-neutral-500">
                  <th
                    scope="col"
                    class="px-6 py-4 text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-4 text-sm font-medium leading-6 text-gray-900"
                  >
                    Surname
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-4 text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-4 text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </th>
                  <th scope="col" class="px-6 py-4"></th>
                </tr>

                <tr v-for="(patient, index) in patients" :key="index">
                  <td class="whitespace-nowrap px-6 py-4">
                    {{ patient.firstname }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    {{ patient.lastname }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    {{ patient.email }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    {{ patient.password }}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <div class="inline-flex">
                      <button
                        @click="editP(patient)"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                      >
                        Edit
                      </button>
                      <button
                        @click="deleteP(patient)"
                        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- END APP -->
  </div>
</template>

<!-- SCRIPThttps://sdh-server.crabdance.com/api/patients/ -->
<script>
import axios from 'axios';
export default {
  data() {
    return {
      env: "http://localhost:3000/patients/",
      isLoggedIn: false,
      isEditing: false,
      isChecked: false,
      message: "Insert your data:",
      patients: [],
      patient: {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        password: ""
      }
    };
  },
  mounted() {
    this.loadData();
  },
  computed: {
    canSubmit() {
      return this.isChecked;
    }
  },
  methods: {
    saveEdit() {
      axios
        .put(
          this.env + this.patient.id,
          this.patient
        )
        .then((response) => {
          this.patients = response.data;
          // Handle successful response
        })
        .catch((error) => {
          console.error(error);
          // Handle error
        });
      this.$refs.myForm.reset();
      this.isChecked = false;
      this.patient = {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        password: ""
      };
      this.isEditing = false; // Set isEditing back to false
    },
    cancelEdit() {
      this.patient = {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        password: ""
      };
      this.isEditing = false; // Set isEditing back to false
    },
    // edit
    editP(patient) {
      this.termsAccepted = false;
      this.patient = { ...patient };
      this.isEditing = true;
    },

    // delete
    deleteP(patient) {
      var id = patient.id;
      axios
        .delete(this.env + id)
        .then((response) => {
          this.patients = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    // load
    loadData() {
      axios
        .get(this.env)
        .then((response) => {
          // JSON responses are automatically parsed.
          this.patients = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    // add new
    submitForm() {
      this.patient.id = Math.random().toString();
      axios
        .post(this.env, this.patient)
        .then((response) => {
          this.patients = response.data;
        })
        .catch((e) => {
          this.errors.push(e);
        });
      this.$refs.myForm.reset();
      this.isChecked = false;
      this.patient = {
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        password: ""
      };
    }
  }
};
</script>
