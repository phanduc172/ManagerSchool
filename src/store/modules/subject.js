import axios from "@/core/axios";
import api from "../../api";
const state = {
  entries: [
    {
      id: 1,
      subjectName: "Toán học",
      subjectTeacher: "Phan Đức",
    },
    {
      id: 2,
      subjectName: "Vật lý",
      subjectTeacher: "Nguyễn Minh",
    },
    {
      id: 3,
      subjectName: "Hóa học",
      subjectTeacher: "Trần Anh",
    },
    {
      id: 4,
      subjectName: "Sinh học",
      subjectTeacher: "Lê Văn",
    },
    {
      id: 5,
      subjectName: "Ngữ văn",
      subjectTeacher: "Võ Thị",
    },
    {
      id: 6,
      subjectName: "Lịch sử",
      subjectTeacher: "Hoàng Thái",
    },
    {
      id: 7,
      subjectName: "Địa lý",
      subjectTeacher: "Ngô Quang",
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
  async CreateSubject(_, { id, body }) {
    const response = await axios({
      url: api.params("CreateSubject", { id }),
      method: "POST",
      data: body,
    });
    return response;
  },
  async UpdateSubject(_, { id, body }) {
    const response = await axios({
      url: api.params("UpdateSubject", { id }),
      method: "PUT",
      data: body,
    });
    return response;
  },
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
