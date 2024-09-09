import axios from "@/core/axios";
import api from "../../api";

const state = {
  entries: [
    {
      id: 1,
      subjectName: "Toán học",
      subjectTeacher: "Phan Đức",
    },
  ],
};

const getters = {
  subjects(state) {
    return state.entries;
  },
};

const actions = {
  async ListSubjects(_, query = {}) {
    const response = await axios({
      url: api.ListSubjects,
      method: "GET",
      params: query,
    });
    return response;
  },
  async getSubjectById({ commit }, id) {
    const response = await axios({
      url: api.params("SubjectDetails", { id }),
      method: "GET",
    });
    return response.data;
  },
  async CreaterSubject(_, data) {
    const response = await axios({
      url: api.CreateSubject,
      method: "POST",
      data: data,
    });
    return response.data;
  },

  async UpdateSubject(_, { id, data }) {
    const response = await axios({
      url: api.params("UpdateSubject", { id }),
      method: "PATCH",
      data: data,
    });
    console.log(response);
    return response.data;
  },
  // async UpdateSubject(_, data) {
  //   const response = await axios({
  //     url: api.params("UpdateSubject", {id: data.id }),
  //     method: "PATCH",
  //     data: data,
  //   });
  //   console.log(response.data,"Update thanh cong");

  //   return response.data;
  // },

  async DeleteSubject(_, id) {
    const response = await axios({
      url: api.params("DeleteSubject", { id }),
      method: "DELETE",
    });
    return response;
  },
};

const mutations = {
  UpdateSubject(state, entries) {
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
