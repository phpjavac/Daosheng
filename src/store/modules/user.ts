import { ActionTree, MutationTree, Module } from "vuex";
import { UserService } from "../../services/index";
import { ACCESS_TOKEN_KEY } from "../../lib/storage";
import { AppRouterRecordRaw } from "../../router/type";

class State {
  code = "admin";

  role = "";

  addRoutes: AppRouterRecordRaw[] = [];
}

class User implements Module<State, unknown> {
  namespaced = true;

  state = new State();

  mutations: MutationTree<State> = {
    userState(state, payload) {
      Object.assign(state, payload);
      sessionStorage.setItem(ACCESS_TOKEN_KEY, payload.token);
      sessionStorage.setItem("role", payload.role);
      sessionStorage.setItem("code", payload.code);
      sessionStorage.setItem("name", payload.name);
    },
  };

  actions: ActionTree<State, unknown> = {
    login({ commit }, payload) {
      const { auth } = UserService;
      return new Promise((resolve, reject) => {
        auth(payload)
          .then((res) => {
            const { data } = res;
            commit("userState", data);
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getByCode(_: unknown, payload) {
      const { authInfo } = UserService;
      return new Promise((resolve, reject) => {
        const code = sessionStorage.getItem("code");
        authInfo({ code })
          .then((res) => {
            const { data } = res;
            resolve(data);
          })
          .catch((err) => reject(err));
      });
    },
    logout({ state }) {
      const { logOut } = UserService;
      return new Promise((resolve, reject) => {
        logOut()
          .then((res) => {
            const { data } = res;
            sessionStorage.clear();
            resolve(data);
          })
          .catch((err) => reject(err));
      });
    },
  };
}

export default new User();
