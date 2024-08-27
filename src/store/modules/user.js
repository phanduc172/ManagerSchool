import axios from "@/core/axios";
import api from "../../api";
const state = {
  entries: [
    {
        "Id": "66bae0d207b8b9552965dcd3",
        "name": "admin2",
        "email": "tranvandatevondev0503@gmail.com",
        "avatar": "https://images2.thanhnien.vn/528068263637045248/2024/1/25/c3c8177f2e6142e8c4885dbff89eb92a-65a11aeea03da880-1706156293184503262817.jpg",
        "role_type": "admin",
        "created_at": "0001-01-01T00:00:00Z",
        "updated_at": "0001-01-01T00:00:00Z"
    },
    {
        "Id": "66beacf828de9e277720d400",
        "name": "Hoàng Hạnh Diệu Anh",
        "email": "hoanghanhdieuanh2112@gmail.com",
        "avatar": "https://images2.thanhnien.vn/528068263637045248/2024/1/25/c3c8177f2e6142e8c4885dbff89eb92a-65a11aeea03da880-1706156293184503262817.jpg",
        "role_type": "owner",
        "created_at": "0001-01-01T00:00:00Z",
        "updated_at": "0001-01-01T00:00:00Z"
    },
  ],
};

const getters = {
  users(state) {
    return state.entries;
  },
};

const actions = {
  async GetProfile(_, query = {}) {
    const response = await axios({
      url: api.GetProfile,
      method: "GET",
      params: query,
    });
    return response;
  },
  
  async ListAllAccount(_, query = {}) {
    const response = await axios({
      url: api.ListAllAccount,
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
