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
  setError(state, errorMessage) {
    state.errors = {
      ...state.errors,
      login: errorMessage,
    };
  },
  clearErrors(state) {
    state.errors = {};
  }
};

const actions = {
  async handleRegister(
    { commit },
    { username, email, password, role_type, avatar }
  ) {
    const response = await axios({
      url: api.UserRegiser,
      method: "POST",
      data: {
        name: username,
        email: email,
        password: password,
        role_type: role_type,
        avatar: avatar,
      },
    });
    if (response.status === 200) {
      console.log("Đăng ký thành công!");
    } else {
      console.error("Lỗi đăng ký:", response.data);
    }
  },

  async handleLogin(_, { account, password }) {
    const response = await axios({
      url: api.UserLogin,
      method: "POST",
      data: {
        email: account,
        password,
      },
    });
    if (response.data.status === 200) {
      sessionStorage.setItem("token", response.data.data.access_token);
    }
  }
  ,

  async handleLogout({ commit }) {
    sessionStorage.removeItem("profile");
    sessionStorage.removeItem("token");
    commit("setProfile", null);
    commit("setToken", null);
  },

  async handleRecoverPassword(_, { email }) {
    const response = await axios({
      url: api.RecoverPassword,
      method: "POST",
      data: {
        email: email,
      },
    });
    console.log(response)
      ; return response.data;
  },

  async getProfile({ commit }) {
    const response = await axios({
      url: api.GetProfile,
      method: "GET",
    });

    if (response?.data?.status === 200) {
      commit("setProfile", response.data?.data);
    } else {
      sessionStorage.removeItem("token");
      window.location.href = "/";
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
