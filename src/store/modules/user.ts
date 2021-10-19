import { ActionTree, MutationTree, Module } from "vuex";

class State {
  code = "admin";

  role = "";
}

class User implements Module<State, unknown> {
  namespaced = true;

  state = new State();

  mutations: MutationTree<State> = {};

  actions: ActionTree<State, unknown> = {};
}

export default new User();
