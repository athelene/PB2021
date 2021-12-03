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
   console.log('login mutation says state.user is: ', state.user)
 },
   logout (state) {
  state.user = []

   console.log('logout mutation says state.user is: ', state.user)
 },
   story (state, game) {
   state.game = game
   console.log('game mutation says state.game is: ', state.game)
 },
},
 actions: {
   login({commit}, user) {
     console.log('starting action login, user is: ', user)
     commit('login', user)
     console.log('ran login-commit, the store now has user as: ', user)
   },
   logout({commit}) {
     commit('logout')
   },
   setGame({commit}, game) {
     console.log('starting action setGame, game is: ', game)
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
