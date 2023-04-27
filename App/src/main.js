import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createStore } from "vuex";
import createPersistedState from "vuex-plugin-persistedstate";

const store = createStore({
  state: {
    isLoggedIn: false,
  },
  mutations: {
    logIn(state, value){
        state.isLoggedIn = value;
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
