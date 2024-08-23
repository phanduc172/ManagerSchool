import axios from "../../core/axios";
import api from "../../api";
const state = {
  profile: {
    token: "",
  },
};

const getters = {
  user: (state) => state.user,
  profile: (state) => state.profile,
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setProfile(state, profile) {
    state.profile = profile;
  },
};

const actions = {
  async handleLogin({ commit }, { account, password }) {
    const user = account === "phanduc@gmail.com" && password === "123";
    if (user) {
      const userData = {
        email: "phanduc@gmail.com",
        password: "123",
        name: "Phan Đức",
        token: "gmslgnslkdgnksngsndgsdbjsbj3jt350sjgb",
      };
      sessionStorage.setItem("token", userData.token);
      commit("setProfile", userData);
      return userData;
    } else {
      throw new Error("Tài khoản hoặc mật khẩu không đúng");
    }
  },
  
  async handleLogout({ commit }) {
    sessionStorage.removeItem("profile");
    sessionStorage.removeItem("token");
    commit('setProfile', null)
    this.router.push("/dashboard")
  },

  async getProfile({ commit }) {
    // const response = await axios({
    //   url: api.GetProfile,
    //   method: "GET",
    // });
    const response = {};
    if (response?.code == 200) {
      commit("setProfile", response.data?.data);
    } else {
      commit("setProfile", {
        email: "phanduc@gmail.com",
        password: "123",
        name: "Phan Đức",
        token: "token",
      });
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
