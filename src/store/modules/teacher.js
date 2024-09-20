import axios from "@/core/axios";
import api from "../../api";
const state = {
  entries: [],
};

const getters = {
  teachers(state) {
    return state.entries;
  },
};

const actions = {
  async ListTeachers(_, query = {}) {
    const response = await axios({
      url: api.ListTeachers,
      method: "GET",
      params: query,
    });
    return response;
  },
  async getTeacherById(_, id) {
    const response = await axios({
      url: api.params("GetDetailUser", { id }),
      method: "GET",
    });
    return response.data;
  },
  async CreateTeacher(_, { id, body }) {
    const response = await axios({
      url: api.params("CreateTeacher", { id }),
      method: "POST",
      data: body,
    });
    return response;
  },
  async UpdateTeacher(_, { id, data }) {
    const response = await axios({
      url: api.params("UpdateTeacher", { id }),
      method: "PATCH",
      data: data,
    });
    return response.data;
  },
  async DeleteTeacher(_, id) {
    const response = await axios({
      url: api.params("DeleteTeacher", { id }),
      method: "DELETE",
    });
    return response;
  },
};

const mutations = {
  UpdateTeachers(state, entries) {
    state.entries = entries;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
