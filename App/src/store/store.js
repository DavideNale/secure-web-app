import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

export const store = createStore({
  state () {
    return {
      count: 1,
    }
  },
});