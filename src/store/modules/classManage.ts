import { ActionTree, MutationTree, Module } from "vuex";
import { UserService } from "../../services/index";

class State {
  classList = [];

  studentList = [];
}

class ClassManage implements Module<State, unknown> {
  namespaced = true;

  state = new State();

  mutations: MutationTree<State> = {
    updateClassList(state, payload) {
      state.classList = payload || [];
    },
  };

  actions: ActionTree<State, unknown> = {
    /**
     * 获取班级列表
     */
    getClass({ commit }, queryForm) {
      const { getClassList } = UserService;
      return new Promise((resolve, reject) => {
        getClassList(queryForm)
          .then((res) => {
            const { data } = res;
            commit("updateClassList", data.list);
            resolve(data.totalPages);
          })
          .catch((err) => reject(err));
      });
    },
  };
}

export default new ClassManage();
