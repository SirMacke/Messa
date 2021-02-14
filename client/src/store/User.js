export const UserModule = {
  namespaced: true,

  state: {
    user: null
  },

  // Mutations are functions that effect the STATE.
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_NEW_THREAD(state, data) {
      state.user.threads.unshift(data);
    },
    SET_NEW_MESSAGE(state, data) {
      for (let i = 0; i < state.user.threads.length; i++) {
        if (state.user.threads[i]._id == data.threadId) {
          console.log('mutations');
          console.log(state.user.threads[i].messages);
          console.log(data.msg);
          state.user.threads[i].messages.push(data.msg);
        }
      }
    }
  },

  // Actions are functions that you call throughout your application that call mutations
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
    setNewThread({ commit }, data) {
      commit('SET_NEW_THREAD', data);
    },
    setNewMessage({ commit }, data) {
      console.log('actions');
      console.log(data);
      console.log(data.msg);
      commit('SET_NEW_MESSAGE', data);
    }
  }
}