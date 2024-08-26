import axios from "@/core/axios";
import api from "../../api";
const state = {
  entries: [
    {
      id: 1,
      nameClass: "Lớp 1A",
      nameTeacher: "Phan Đức",
      totalClass: 10,
    },
    {
      id: 1,
      nameClass: "Lớp 1A",
      nameTeacher: "Phan Đức",
      totalClass: 10,
    },
    {
      id: 1,
      nameClass: "Lớp 1A",
      nameTeacher: "Phan Đức",
      totalClass: 10,
    },
    {
      id: 1,
      nameClass: "Lớp 1A",
      nameTeacher: "Phan Đức",
      totalClass: 10,
    },
    {
      id: 1,
      nameClass: "Lớp 1A",
      nameTeacher: "Phan Đức",
      totalClass: 10,
    },
    {
      id: 1,
      nameClass: "Lớp 1A",
      nameTeacher: "Phan Đức",
      totalClass: 10,
    },
    {
      id: 1,
      nameClass: "Lớp 1A",
      nameTeacher: "Phan Đức",
      totalClass: 10,
    },
  ],
};

const getters = {
  classes(state) {
    return state.entries;
  },
};

const actions = {
  async ListClass(_, query = {}) {
    const response = await axios({
      url: api.ListClass,
      method: "GET",
      params: query,
    });
    return response;
  },
  async CreateClass(_, { id, body }) {
    const response = await axios({
      url: api.params("CreateClass", { id }),
      method: "POST",
      data: body,
    });
    return response;
  },
  async UpdateClass(_, { id, body }) {
    const response = await axios({
      url: api.params("UpdateClass", {id}),
      method: "PUT",
      data: body,
    });
    return response;
  },
  async DeleteClass(_, id) {
    const response = await axios({
      url: api.params("DeleteClass", {id}),
      method: "DELETE",
    });
    return response;
  },
};

const mutations = {
    UpdateClass(state, entries) {
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
