import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createStore } from "vuex";
import createPersistedState from "vuex-plugin-persistedstate";

const store = createStore({
  state: {
    env: 'https://sdh-server.crabdance.com/api/',
    isLoggedIn: false,
    JWT : '',
    patientsData: {},
    pat: null,
  },
  mutations: {
    setPat(state, pat) {
      state.pat = pat
    },
    logIn(state, payload){
        state.isLoggedIn = payload.value;
        state.JWT = payload.token;
    },
    setPatientsData(state, data) {
      state.patientsData = data;
    }
  },
  actions: {},
  getters: {
    getPatientsData: state => {
      return state.patientsData;
    }
  },
  plugins: [createPersistedState()],
});

let app = createApp(App);
app.use(store);
app.mount("#app");
