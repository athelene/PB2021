import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [createPersistedState({
       storage: window.sessionStorage,
   })],
 state: {
   user: [],
   story: []
   },
 mutations: {
 login (state, user) {
   state.user = user
 },
   logout (state) {
  state.user = []

 },
   story (state, game) {
   state.game = game
 },
},
 actions: {
   login({commit}, user) {
     commit('login', user)
   },
   logout({commit}) {
     commit('logout')
   },
   setGame({commit}, game) {
     commit('game', game)
   },
},
   getters: {
       getUser: state => state.user,
       getGame: state => state.game,
   }

})
Vue.prototype.$store = store;

export default store;
