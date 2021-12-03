
<template>

  <nav>

         <v-app-bar app class="orange darken--3" > 
        <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer">
        </v-app-bar-nav-icon>
          <v-toolbar-title class="white--text mt-3">Cedar Creek Pickleball
          <p class="white--text" v-if="user.UserID > 0">Welcome {{user.UserDisplayName}}</p>
          </v-toolbar-title>


         </v-app-bar>


      <v-navigation-drawer app v-model="drawer" class="blue white--text">
          <v-btn @click="drawer = !drawer" class="orange darken-3"><v-icon class="white--text">mdi-backburger</v-icon></v-btn>
          <p @click="goToRoute('Home')">Scheduled Games</p>
          <p v-if="user.userAdmin === 1" @click="goToRoute('StandingGames')">Manage Weekly Games</p>
          <p @click="goToRoute('groups')">Groups</p>
          <p @click="goToRoute('players')">Players</p>
          <p @click="logout()">Logout</p>
      </v-navigation-drawer>
  </nav>
  
</template>


<script>
export default {
  name: "Nav",

  data: () => ({
    drawer: false
  }),
      computed: {
  user(){
    return this.$store.state.user
  }
        
  },
  methods: {
      goToRoute(setRoute) {
          this.drawer = false;
        this.$router.push(setRoute)
      },

      logout() {
        console.log('write logout');
        sessionStorage.clear();
        this.$store.dispatch('logout');
        console.log('this.$store.state.user is:', this.$store.state.user)
        window.location.replace('/login');
      }
  }

};
</script>
