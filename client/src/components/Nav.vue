
<template>

  <nav>
         <v-app-bar app class="orange darken--3" > 
        <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer">
        </v-app-bar-nav-icon>
          <v-toolbar-title class="white--text mt-3"><span @click="goToRoute('main')">
            <v-icon color="white">mdi-home</v-icon>
            Dinking Divas Pickleball</span>
          </v-toolbar-title>
        <v-spacer></v-spacer>
      <v-btn icon  @click="goToRoute('message')">
        <v-icon color="white">mdi-message-outline</v-icon></v-btn>

         </v-app-bar>


      <v-navigation-drawer app v-model="drawer" class="blue white--text" v-if="user.UserID">
          <v-btn @click="drawer = !drawer" class="orange darken-3"><v-icon class="white--text">mdi-backburger</v-icon></v-btn>
          <p class="yellow--text" v-if="user.UserID > 0">Welcome {{user.UserDisplayName}}</p>
          <p @click="goToRoute('main')">Home</p>
          <p @click="goToRoute('players')">Players</p>
          <p @click="goToRoute('friends')">Friends</p>
          <p @click="goToRoute('eventlist')">Events</p>
          <p @click="goToRoute('Faq')">Frequently Asked Questions</p>
          <p @click="goToRoute('invitations')">People Invited to App</p>
            <a href="./assets/static/Rules.pdf" target="blank" class="rulesLink">Rules</a><BR/><BR/>
            <a href="./assets/static/PickleballApp.pdf" target="blank" class="rulesLink">App Documentation</a>
          <p @click="logout()" class="mt-4">Logout</p>
      </v-navigation-drawer>
      
  </nav>
  
</template>


<script>
export default {
  name: "Nav",

  data: () => ({
    drawer: false,
    rulesRoute: ''
  }),

  computed: {
  user(){
    return this.$store.state.user.user
  }
        
  },
  mounted() {
    console.log('nav store is: ', this.$store.state.user.user)
    this.setRulesRoute();

  },

  
  methods: {
      goToRoute(setRoute) {
          this.drawer = false;
        this.$router.push(setRoute)
      },

      logout() {
        sessionStorage.clear();
        this.$store.dispatch('logout');
        window.location.replace('/');
      },

      setRulesRoute() {
        let servername = 'https://' + window.location.hostname;
        if (servername === 'https://localhost') {
          servername = 'http://localhost:8700';
          this.rulesRoute = servername + '/Rules.pdf'
}
      }
  }

};
</script>

<style scoped>

.rulesLink {
  text-decoration: none;
  color: white;
}
</style>