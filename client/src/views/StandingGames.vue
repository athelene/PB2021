<template>

<div v-if="user.UserID > 0">

  <div class="text-center">
    <div >
<br />
<h1 class="ml-3 headingColor">Weekly Games</h1>
<v-btn class="ml-3" small color="primary" @click="newStandingGame()">New Weekly Game</v-btn>
 <div v-if="games.length < 1" class='cardBackground'>
     <h3 class="ml-3 black--text">There are no weekly games scheduled.</h3></div>
  <v-card
      v-for="game in games" :key="game.GameID"
    class="mx-auto mb-5 mt-3 cardBackground"
    max-width="344"
    elevation="2"
  >

  <h3>{{game.GameDay}} - {{game.GameDate}} </h3>
  <h3>{{game.GameStart}} - {{game.CourtName}}</h3>
 <h3>{{game.GroupName}}</h3>
     

<v-row class="justify-center"> 
    <v-btn v-if="user.userAdmin === 1"
    small icon color="primary" class="mt-3 pl-4"
    @click="editGame(game.StandingGameID)"
    ><v-icon>mdi-pencil</v-icon></v-btn>

    <v-spacer></v-spacer>
    <v-btn v-if="user.userAdmin === 1"
    small icon color="primary" class="mt-3 pr-4"
    @click="deleteStandingGame(game.StandingGameID)"><v-icon>mdi-trash-can</v-icon></v-btn>
 </v-row>
  
  </v-card>


      </div>
      
  </div>
</div>
</template>

<script>
import EventService from '../Services/EventServices'

export default {
  name: "StandingGames",

  components: {
    
  },

  data: function() {
    return {
      currentDate: '',
      fullDate: '',
      show: false,
      games: [],
    }
  },

  mounted (){
    this.goToToday();
    this.getStandingGameList();
  },

computed: {
  user(){
    return this.$store.state.user
  }
        
  },

 methods: {

    async editGame(standingGameID) {
    this.$router.push({ path: 'Editstandinggame', query: { ID: standingGameID } })
  },

    async startDate () {
       var dateInput = new Date();
    var dow = ''
    switch (dateInput.getDay()) {
  case 0:
    dow = "Sunday";
    break;
  case 1:
    dow = "Monday";
    break;
  case 2:
     dow = "Tuesday";
    break;
  case 3:
    dow = "Wednesday";
    break;
  case 4:
    dow = "Thursday";
    break;
  case 5:
    dow = "Friday";
    break;
  case 6:
    dow = "Saturday";
}
    console.log('day is: ', dow)
    var month = dateInput.getMonth() + 1
    var day = dateInput.getDate() 
    var year = dateInput.getFullYear()
    var dispDate =  dow + ', ' + month + ' / ' + day + ' / ' + year
    var fullDate = month + '-' + day + '-' + year
    this.fullDate = fullDate
    this.dispDate = dispDate
    console.log('fulldate is: ', this.fullDate)
    },

    async  goToToday() {
      var currentDate = new Date();
      this.currentDate = currentDate;
      this.startDate();
    },

    async  newStandingGame() {
          this.$router.push("Newstandinggame")
    },

    async getStandingGameList() {
      console.log(' starting getStandingGameList')
      await EventService.getStandingGameList()
      .then(
        (gameReturn => {
          this.games = gameReturn
            console.log('gameReturn and this.games (full) are: ', gameReturn, this.games)
        })
      );
    },

    async deleteStandingGame(standingGameID) {

   if(confirm("Do you really want to delete this standing game? (This will not delete games already posted.")){

      await EventService.deleteStandingGame(standingGameID)
      .then(
        (gameDelete => {
            console.log('standinggameDelete back from ES is: ', gameDelete)
            this.getStandingGameList()
        })
      )
      .catch(error => {
          console.log(error);
      })
   }
    }
  }

}
</script>

<style scoped>
body {
   min-height: 100vh;
}

.appBackground {
  background: url(../assets/pickleball.jpg) no-repeat center center fixed; 
}

.cardBackground {
  background-color: rgb(180, 250, 174);
}

.headingColor {
    color: rgb(180, 250, 174);
}

.mainDiv {
  background-color: cornflowerblue;
  height: 100%;
  display: inline;
}

.Open {
  background-color: #a9e7fa;
}
</style>