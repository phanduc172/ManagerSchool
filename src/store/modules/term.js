import axios from "@/core/axios";
import api from "../../api";
import {
  showDeleteConfirmation,
  showSuccessMessage,
} from "../../common/utils/notifications";
const state = {
  entries: [
    {
        "id": "66d035feb356f418e9f9f5a0",
        "term_semester": 1,
        "term_from_year": 2023,
        "term_to_year": 2024,
        "total_credits": 0,
        "created_at": "2024-08-29T08:49:02.651Z",
        "updated_at": "2024-08-29T08:49:02.651Z"
    },
  ],
};

const getters = {
  terms(state) {
    return state.entries;
  },
};

const actions = {
  async ListTerms(_, query = {}) {
    const response = await axios({
      url: api.ListTerm,
      method: "GET",
      params: query,
    });
    return response;
  },
  async getTermById({ commit }, id) {
    const response = await axios({
      url: api.params("MajorDetails", { id }),
      method: "GET",
    });
    return response.data;
  },
  async CreaterTerm(_, data) {
    const response = await axios({
      url: api.CreateTerm,
      method: "POST",
      data: data,
    });
    return response.data;
  },

  async UpdateTerm(_, { id, data }) {
    const response = await axios({
      url: api.params("UpdateMajor", { id }),
      method: "PATCH",
      data: data,
    });
    console.log(response);
    return response.data;
  },

  async DeleteTerm(_, id) {
    const response = await axios({
      url: api.params("DeleteMajor", { id }),
      method: "DELETE",
    });
    return response;
  },
};

const mutations = {
  UpdateTerm(state, entries) {
    state.entries = entries;
  },
  SET_TERMS(state, terms) {
    state.terms = terms;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
