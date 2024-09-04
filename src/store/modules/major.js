import axios from "@/core/axios";
import api from "../../api";

const state = {
  entries: [
    {
      Id: "66c8628397d36bd575f33035",
      major_id: "TIN102",
      major_name: "TIN",
    },
  ],
};

const getters = {
  majors(state) {
    return state.entries;
  },
};

const actions = {
  async ListMajors(_, query = {}) {
    const response = await axios({
      url: api.ListMajor,
      method: "GET",
      params: query,
    });
    return response;
  },
  async getMajorById(_, id) {
    const response = await axios({
      url: api.params("MajorDetails", { id }),
      method: "GET",
    });
    return response.data;
  },
  async CreateMajor(_, data) {
    const response = await axios({
      url: api.CreateMajor,
      method: "POST",
      data: data,
    });
    console.log(response, "response");
    return response.data;
  },
  async UpdateMajor(_, { id, data }) {
    const response = await axios({
      url: api.params("UpdateMajor", { id }),
      method: "PATCH",
      data: data,
    });
    console.log(response);
    return response.data;
  },
  async DeleteMajor(_, id) {
    const response = await axios({
      url: api.params("DeleteMajor", { id }),
      method: "DELETE",
    });
    return response;
  },
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
