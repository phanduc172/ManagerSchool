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
    async ListSchedules(_, query = {}) {

        const response = await axios({
            url: api.ListSchedules,
            method: "GET",
            params: query,
        });
        return response;
    },
    async DeleteSchedule(_, id) {
        const response = await axios({
            url: api.params("DeleteSchedule", { id }),
            method: "DELETE",
        });
        return response;
    },
    async CreateSchedule(_, data) {
        console.log("Calling API:", api.CreateSchedule);
        console.log("Insert data,", data);

        const response = await axios({
            url: api.CreateSchedule,
            method: "POST",
            data: data,
        });
        console.log(response.data);

        return response.data;
    }
    ,
    async UpdateSchedule(_, { id, data }) {
        const response = await axios({
            url: api.params("UpdateSchedule", { id }),
            method: "PATCH",
            data: data,
        });
        return response.data;
    },
    async GetDetailSchedule(_, id) {
        const response = await axios({
            url: api.params("GetDetailSchedule", { id }),
            method: "GET",
        });
        return response.data;
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
