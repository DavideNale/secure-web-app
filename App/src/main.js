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
    patientsData: null,
  },
  mutations: {
    logIn(state, payload){
        state.isLoggedIn = payload.value;
        state.JWT = payload.token;
    },
  },
  actions: {},
  getters: {
    getTodos(state) {
      return state.todos;
    }
  },
  plugins: [createPersistedState()],
});

let app = createApp(App);
app.use(store);
app.mount("#app");
