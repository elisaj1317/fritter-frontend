import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    filter: null, // Username to filter shown freets by (null = show all)
    freets: [], // All freets created in the app
    likedFreets: [], // All freets liked by current user
    likedComments: [], // All comments liked by current user
    username: null, // Username of the logged in user
    alerts: {} // global success/error messages encountered during submissions to non-visible forms
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    updateFilter(state, filter) {
      /**
       * Update the stored freets filter to the specified one.
       * @param filter - Username of the user to fitler freets by
       */
      state.filter = filter;
    },
    updateFreets(state, freets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.freets = freets;
    },
    updateLikedFreets(state, likes) {
      /**
       * Update the stored liked freets to the freets liked by current user.
       * @param likes - Freets liked by current user
       */
      state.likedFreets = likes;
    },
    updateLikedComments(state, likes) {
      /**
       * Update the stored liked comments to the comments liked by current user.
       * @param likes - Comments liked by current user
       */
      state.likedComments = likes;
    }
  },
  actions: {
    async refreshFreets({commit, state}) {
      /**
       * Request the server for the currently available freets.
       */
      const url = state.filter ? `/api/freets?author=${state.filter}` : '/api/freets';
      const res = await fetch(url).then(async r => r.json());
      commit('updateFreets', res);
    },
    async refreshLikedFreets({commit}) {
      /**
       * Request the server for the liked freets of current user.
       */
      const url = '/api/likes/freets';
      const res = await fetch(url).then(async r => r.json());
      commit('updateLikedFreets', res);
    },
    async refreshLikedComments({commit}) {
      /**
       * Request the server for the liked comments of current user.
       */
      const url = '/api/likes/comments';
      const res = await fetch(url).then(async r => r.json());
      commit('updateLikedComments', res);
    }
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
