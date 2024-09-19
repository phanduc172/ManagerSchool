import axios from "@/core/axios";
import api from "../../api";
const state = {
    entries: [
    ],
};

const getters = {
    schedules(state) {
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
};

const mutations = {
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
