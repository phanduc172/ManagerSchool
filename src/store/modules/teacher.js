import axios from "@/core/axios";
import api from "../../api";
const state = {
  entries: [
    {
      id: 1,
      name: "Nguyễn Văn A",
      birthday: "01/01/1980",
      phone: "0909123456",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      class: "Lớp 10A1",
      department: "Khoa Toán",
      avatar: "https://bootdey.com/img/Content/avatar/avatar1.png",
    },
    {
      id: 2,
      name: "Trần Thị B",
      birthday: "15/05/1985",
      phone: "0918123456",
      address: "456 Đường XYZ, Quận 3, TP.HCM",
      class: "Lớp 11B2",
      department: "Khoa Văn",
      avatar: "https://bootdey.com/img/Content/avatar/avatar2.png",
    },
    {
      id: 3,
      name: "Lê Văn C",
      birthday: "22/09/1990",
      phone: "0922123456",
      address: "789 Đường DEF, Quận 5, TP.HCM",
      class: "Lớp 12C3",
      department: "Khoa Hóa",
      avatar: "https://bootdey.com/img/Content/avatar/avatar3.png",
    },
  ],
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
  async CreateTeacher(_, { id, body }) {
    const response = await axios({
      url: api.params("CreateTeacher", { id }),
      method: "POST",
      data: body,
    });
    return response;
  },
  async UpdateTeacher(_, { id, body }) {
    const response = await axios({
      url: api.params("UpdateTeacher", {id}),
      method: "PUT",
      data: body,
    });
    return response;
  },
  async DeleteTeacher(_, id) {
    const response = await axios({
      url: api.params("DeleteTeacher", {id}),
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
