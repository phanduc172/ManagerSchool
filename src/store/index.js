import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import teacher from "./modules/teacher";
import student from "./modules/student";
import user from "./modules/user";
import classes from "./modules/classes";
import subject from "./modules/subject";
import major from "./modules/major";
import term from "./modules/term";
import schedule from "./modules/schedule";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    teacher,
    student,
    user,
    classes,
    subject,
    major,
    term,
    schedule,
  },
});

export default store;
