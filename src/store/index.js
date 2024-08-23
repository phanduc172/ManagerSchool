import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import teacher from './modules/teacher';
import student from './modules/student';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    teacher,
    student,
    user,
  }
});

export default store;
