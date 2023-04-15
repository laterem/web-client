import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      user_id: 0,
    };
  },
  getters: {},
  mutations: {
    setUserId(state, id) {
      state.user_id = id;
    },
  },
  actions: {},
  modules: {},
});

export default store;
