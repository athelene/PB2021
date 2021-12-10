
<template>
<div class="">
  <h3 v-if="earliestTime !== '' && earliestTime !== null && earliestTime !== undefined"> Everyone can play starting {{earliestTime}} </h3>

  <v-expansion-panels v-if="playerCount > 0">
    <v-expansion-panel    >
      <v-expansion-panel-header>
       <h3 >{{playerCount}} Player(s) Available</h3>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div v-for="player in playerList" :key="player.playerID">
           <a :href="'mailto:' + player.userEmail">{{player.userDisplayName}}</a>, 
           <a :href="'tel:' + player.userPhone">{{player.userPhone}}</a>, available starting: {{player.StartTime}}
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
        <v-btn v-if="!available"
          color="blue"
          dark
          @click="setAvailable()"
        >
         Join 
        </v-btn> 
    <v-btn v-if="available"
          color="green"
          dark
           @click="setResign()"
        >
          Drop Out
        </v-btn> 
        <v-btn v-if="available"
          color="blue"
          dark
          @click="openTime=true"
        >
         Change My Time
        </v-btn> 

    <v-card v-if="openTime">
        <v-card-title>
    How early can you start? </v-card-title>
    <v-card-text>
        <v-select
          :items="startTime"
          :item-text="'display'"
          :item-value="'time'"
          label="Select the earliest time you are available"
          solo
          v-model="selectedTime"
        ></v-select>
    </v-card-text>
    <v-card-actions>
        <v-btn @click="saveTime()">Save</v-btn> 
        <v-btn v-if="myTime !== ''" @click="openTime = false">Cancel</v-btn>
        <v-btn v-if="myTime === ''" @click="cancelChange()">Cancel</v-btn>
    </v-card-actions>
    </v-card>


  </div>
</template>


<script>
import EventService from '../Services/EventServices'

export default {
  name: "Day",
  props: ['gameDate'],
  data: () => ({
    available: false,
    openTime: false,
    startTime: [
        { time: "07:00:00", display: " 7:00AM" },
        { time: "07:30:00", display: " 7:30AM" },
        { time: "08:00:00", display: " 8:00AM" },
        { time: "08:30:00", display: " 8:30AM" },
        { time: "09:00:00", display: " 9:00AM" },
        { time: "09:30:00", display: " 9:30AM" },
        { time: "10:00:00", display: " 10:00AM" },
        { time: "10:30:00", display: " 10:30AM" },
        { time: "11:00:00", display: " 11:00AM" },
        { time: "11:30:00", display: " 11:30AM" }
    ],
    selectedTime: '',
    myTime2: '',
    earliestTime: '',
    playerCount: 0,
    playerList: ''

  }),
  
  computed: {
  user(){
    return this.$store.state.user.user
  }
        
  },

  mounted (){
      console.log('incoming gameDate is: ', this.gameDate)
      console.log('user is: ', this.user.UserID)
       this.getMyTime();
       this.getEarliestTime()
       this.getPlayerCount();



  },

  methods: {
      async setAvailable() {
          this.openTime = true;
      },

      async cancelChange() {
        this.available = true;
        this.openTime = false;
      },

      async setResign() {
          this.available = false;
          this.openTime = false;
        await EventService.resignMyGame(this.user.UserID, this.gameDate, 'A')
      .then(
        (() => {
            console.log('resigned')
       this.getMyTime();
       this.getEarliestTime()
       this.getPlayerCount();
        })
      );
      },

      async saveTime(){
          this.openTime = false;
          this.available = true;
          console.log('the time saved, userID will be: ', this.selectedTime, this.user.UserID)
        await EventService.setMyTime(this.user.UserID, this.selectedTime, this.gameDate, 'A')
      .then(
        (() => {
            console.log('selectedTime is : ', this.selectedTime)
       this.getMyTime();
       this.getEarliestTime()
       this.getPlayerCount();
        })
      );
      },

      async getMyTime(){
        await EventService.getMyTime(this.user.UserID, this.gameDate, 'A')
      .then(
        ((myTime) => {
          this.selectedTime = myTime.StartTime2
          console.log('myTime.recordsets[0][0] for', this.gameDate, 'A  is : ', myTime.recordsets[0][0])
       if (myTime.recordsets[0].length !== 0 && myTime.recordsets[0] !== '' &&  myTime.recordsets[0] !== undefined) {
              console.log('myTime.recordsets[0] is: '), myTime.recordsets[0][0]
            this.available = true
            this.myTime = myTime.recordsets[0][0].StartTime
            console.log('this.myTime is set to: ', this.myTime)
          } else {
            this.available = false;
            this.myTime = '';
          }
        })
      );
      },

        async getEarliestTime() {
       await EventService.getEarliestTime(this.gameDate, 'A')
      .then(
        ((earliest) => {
            if(earliest.recordsets[0].length > 0) {
          console.log('earliest from ES is : ', earliest)
          this.earliestTime = earliest.recordsets[0][0].StartTime2
            console.log('earliestTime rec from ES A is : ',  this.earliestTime)
        } else {
          this.earliestTime = '';
        }
        })
      );
   },

        async getPlayerCount() {
       await EventService.getPlayerCount(this.gameDate, 'A')
      .then(
        ((playerCountRes) => {
          console.log('playerCountRes.recordset for', this.gameDate, 'A  is : ', playerCountRes.recordset)
          this.playerCount = playerCountRes.output.playerCount
            this.playerList = playerCountRes.recordset
            console.log('PlayerList is: ', this.playerList, 'and playerCount is:', this.playerCount )

        })
      );
      },

//     async getGamePlayers() {
//       console.log(' starting getGamePlayers')
//       await EventService.getGamePlayers(this.gameID)
//       .then(
//         (gamePlayers => {
//           this.GamePlayers = gamePlayers
//             console.log('gamePlayers : ', gamePlayers, this.players)
//         })
//       );
//     },



//     async cancelNote() {
//         this.gameNote = '';
//         this.noteDialog = false;
//     },


//     async deleteGameNote(gameNoteID) {
//       console.log(' starting deleteGameNote')
//       await EventService.deleteGameNote(gameNoteID)
//       .then(
//         (gameNoteReturn => {
//           this.getGameNotes()
//         })
//       );
//     },

//     async getGameNotes() {
//       console.log(' starting getGameNotes')
//       await EventService.getGameNotes(this.gameID)
//       .then(
//         (gameNotes => {
//             console.log('gameNotes back from ES is: ', gameNotes)
//           this.gameNotes = gameNotes
//         })
//       );
//     },

//     async deleteGame(gameID) {

//    if(confirm("Do you really want to delete this game?")){

//       await EventService.deleteGame(this.gameID)
//       .then(
//         (gameDelete => {
//             console.log('gameDelete back from ES is: ', gameDelete)
//             this.$emit('update-games')
//             console.log('emit event here to parent')
//         })
//       )
//       .catch(error => {
//           console.log(error);
//       })
//    }
// },


  }

};
</script>
<style scoped>
.gameBackground {
  background-color: peachpuff;;
}

.listStyle {
   list-style-type: none;
}
</style>
