<template>

<div v-if="user.UserID > 0" >

  <div class="text-center">
    <div  >
<br />
<h1 class="headingColor">Scheduled Games</h1>
<v-btn class="ml-3 mb-5" small color="primary" @click="newGame()">New Game</v-btn>
 <div v-if="games.length < 1">There are no games scheduled.</div>
  <v-card
      v-for="game in games" :key="game.GameID"
    class="mx-auto mb-2 cardBackground"
    max-width="344"
    elevation="2"
  >

  <h3>{{game.GameDay}} - {{game.GameDate}} </h3>
  <h3>{{game.GameStart}} - {{game.CourtName}}</h3>
 <h3>{{game.GroupName}}</h3>
     

    <v-card-text>
      <GamePlayers :gameID="game.GameID" :gameGroup="game.GroupName" :gameCreator="game.GameCreator" @update-games="getFullGameList"/>
    </v-card-text>
  
  </v-card>


      </div>
      
  </div>
</div>
</template>

<script>
import EventService from '../Services/EventServices'
import GamePlayers from '../components/GamePlayers.vue'


export default {
  name: "Home",

  components: {
    GamePlayers
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
    this.getFullGameList();
  },

computed: {
  user(){
    return this.$store.state.user
  }
        
  },

 methods: {
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

      goToToday() {
      var currentDate = new Date();
      this.currentDate = currentDate;
      this.startDate();
    },
    newGame() {
      this.$router.push('Newgame')
    },

    async getFullGameList() {
      console.log(' starting getFullGameList')
      await EventService.getFullGameList()
      .then(
        (gameReturn => {
          this.games = gameReturn
            console.log('gameReturn and this.games (full) are: ', gameReturn, this.games)
        })

      );
    },

   async newGame() {
             this.$router.push('NewGame')
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
    background-size:100% 100%;

}

.headingColor {
  color: rgb(252, 206, 151);
}
.cardBackground {
  background-color: rgb(252, 206, 151);
}

.mainDiv {
  background-color: cornflowerblue;
  height: 100%;
  display: inline;
}
</style>