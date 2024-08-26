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
      id: 2,
      nameClass: "Lớp 1B",
      nameTeacher: "Nguyễn Minh",
      totalClass: 15,
    },
    {
      id: 3,
      nameClass: "Lớp 2A",
      nameTeacher: "Trần Anh",
      totalClass: 12,
    },
    {
      id: 4,
      nameClass: "Lớp 2B",
      nameTeacher: "Lê Văn",
      totalClass: 18,
    },
    {
      id: 5,
      nameClass: "Lớp 3A",
      nameTeacher: "Võ Thị",
      totalClass: 20,
    },
    {
      id: 6,
      nameClass: "Lớp 3B",
      nameTeacher: "Hoàng Thái",
      totalClass: 22,
    },
    {
      id: 7,
      nameClass: "Lớp 4A",
      nameTeacher: "Ngô Quang",
      totalClass: 25,
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
      url: api.params("UpdateClass", { id }),
      method: "PUT",
      data: body,
    });
    return response;
  },
  async DeleteClass(_, id) {
    const response = await axios({
      url: api.params("DeleteClass", { id }),
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
