import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import teacher from './modules/teacher';
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    teacher
  }
});

export default store;
