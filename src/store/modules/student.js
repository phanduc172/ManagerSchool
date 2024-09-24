import axios from "@/core/axios";
import api from "../../api";
const state = {
  entries: [],
};

const getters = {
  students(state) {
    return state.entries;
  },
};

const actions = {
  async ListStudents(_, query = {}) {
    const response = await axios({
      url: api.ListStudents,
      method: "GET",
      params: query,
    });
    return response;
  },
  async getStudentById(_, id) {
    const response = await axios({
      url: api.params("GetDetailUser", { id }),
      method: "GET",
    });
    return response.data;
  },
  // async CreateStudent(_, { id, body }) {
  //   const response = await axios({
  //     url: api.params("CreateStudent", { id }),
  //     method: "POST",
  //     data: body,
  //   });
  //   return response;
  // },
  async UpdateStudent(_, { id, data }) {
    const response = await axios({
      url: api.params("UpdateStudent", { id }),
      method: "PATCH",
      data: data,
    });
    return response.data;
  },
  async DeleteStudent(_, id) {
    const response = await axios({
      url: api.params("DeleteStudent", { id }),
      method: "DELETE",
    });
    return response;
  },
};

const mutations = {
  UpdateStudent(state, entries) {
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
