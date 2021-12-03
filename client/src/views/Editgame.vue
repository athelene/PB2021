<template class="appBackground">
  <div class="newgame appBackground">
    <h1 class="ml-5">Edit Game</h1>
        <v-card class="appBackground">
    <v-form class="Open mt-3" >

  <v-row class="ml-5">
        <v-btn @click="prevDate()" icon v-if="selectedDate > currentDate">
      <v-icon color="orange">mdi-arrow-left</v-icon>
    </v-btn>
    <h3>{{dispDate}}</h3>  
    <v-btn @click="nextDate()" class="ml-4" icon v-if="selectedDate <= stopDate">
      <v-icon color="orange">mdi-arrow-right</v-icon>
    </v-btn>

  </v-row>
  <v-row  class="mb-3" >
    <v-btn v-if="selectedCourt !== 0" @click="prevCourt()" icon class="ml-5 mt-4">
       <v-icon color="orange">mdi-arrow-left</v-icon>
    </v-btn>

    <v-btn disabled v-if="selectedCourt === 0" @click="prevCourt()" icon class="ml-5 mt-4">
      <v-icon color="orange">mdi-arrow-left</v-icon>
    </v-btn>
    <h3 class="mt-4 ml-2 mr-4 text-center">{{courts[selectedCourt].CourtName}}</h3>
    <v-btn v-if="selectedCourt < totalCourts" @click="nextCourt()" class="mt-4" icon>
      <v-icon color="orange">mdi-arrow-right</v-icon>
    </v-btn>
  </v-row>

  <v-row v-if="errorMsg" class="ml-5"><h2>{{errorMsg}}</h2></v-row>

      <div class="align-center mt-3 mb-4">
        <h4 class="ml-5">Current Schedule </h4></div>
      <div class="mb-4 ms-5 scheduledGames" v-if="games.length === 0">No games scheduled.</div>
      <div v-for="game in games" :key="game.gameID" >
      <v-row class="ml-5 mb-5 Selected scheduledGames">
        <v-col         
        cols="12"
        sm="4">
        {{game.GameStart}} - {{game.GameEnd}}, {{game.GroupName}}
        </v-col>
        </v-row>
      </div>
    <div >
    </div>
  <v-row>

<v-select
  ref="start"
  :items="hourList"
  v-model="gameStart"
  item-text="HourBlockDesc"
  item-value="HourBlockDesc"
  solo
  required
  hint="Start time"
  persistent-hint
  class="selectStyle ml-5"
></v-select>
  </v-row>
  <v-row>
<v-select
  ref="minutes"
  :items="minList"
  v-model="gameMinutes"
  item-text="HourBlockDesc"
  item-value="HourBlockDesc"
  hint="Minutes of play"
  persistent-hint
  solo
  class="selectStyle ml-5"
></v-select>
  </v-row>

    <v-row>
<v-select
  ref="group"
  :items="groups"
  v-model="groupID"
  item-text="GroupName"
  item-value="GroupID"
  label="Group"
  solo
  class="selectStyle ml-5"
></v-select>

  </v-row>
  <v-btn class="ml-3 mb-5" @click="saveGame()">Save</v-btn>
</v-form>
    </v-card>

  </div>
</template>

<script>
import EventService from '../Services/EventServices'

export default {
    name: "Editgame",
    data: function() {
    return {
      currentDate: '',
      fullDate: '',
      dispDate: '',
      showDate: false,
      showStart: false,
      showEnd: false,
      gameDate: '',
      gameStart: '',
      gameMinutes: 90,
      editStart: '',
      datetime: '',
      stopDate: '',
      selectedDate: '',
      court: '1',
      courts: [],
      selectedCourt: 0,
      totalCourts: 0,
      hourList: [],
      minList: [30, 60, 90, 120],
      selectedBlocks: [],
      menu: false,
      errorMsg: '',
      groups: [],
      groupID: '',
      gameInfo: [],
      games: [],
      headers: [
      {
        text: 'Game ID',
        align: 'start',
        sortable: false,
        value: 'GameID',
      } ],
      
    }
  },
computed: {
  user(){
    return this.$store.state.user
  },
      
  },
created() {
    console.log('created this.gameDate is: ', this.gameDate)
    this.getCourts();
},
mounted() {
    this.gameID = this.$route.query.ID
    this.getGameInfo();
    this.getHourList();
    this.getGroups();
    this.getGameList();
    var currentDate = new Date();
    this.currentDate = currentDate;
    
},
methods: {

    startDate (theDate) {
    console.log('running startDate, theDate is: ', theDate)
    var dateInput = new Date(theDate);
    console.log('dateInput is: ', dateInput)
    var dow = ''
    console.log('dateInput.getDay() is: ', dateInput.getDay())
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
  console.log('startDate, dow is: ', dow)
    this.selectedDate = this.currentDate;
    var holdDate = new Date(this.currentDate);
    console.log('in startDate holdDate v1 is: ', holdDate)
    holdDate.setDate(holdDate.getDate() + 13);
    this.stopDate = holdDate;
    console.log('in startDate this.stopDate is: ', this.stopDate);
    console.log('in startDate day is: ', dow)
    var month = dateInput.getMonth() + 1
    var day = dateInput.getDate() 
    var year = dateInput.getFullYear()
    var dispDate =  dow + ', ' + month + ' / ' + day + ' / ' + year
    var fullDate = month + '-' + day + '-' + year
    this.editDate = year + '-' + month + '-' + day
    this.fullDate = fullDate
    this.dispDate = dispDate
    console.log('fulldate is: ', this.fullDate)
    this.gameDate = fullDate
    this.getGameList();
    },

    nextDate () {
    var newDate = new Date(this.gameDate)
    console.log('newDate v1 is: ', this.newDate)
    newDate.setDate(newDate.getDate() + 1);
    this.selectedDate = newDate;
    console.log('newDate v2 is: ', newDate)
    var dateInput = new Date(newDate);
    console.log('dateInput is: ', dateInput)
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
    this.gameDate = fullDate
    this.getGameList()
    },

    prevDate () {
    var newDate = new Date(this.gameDate)
    console.log('newDate v1 is: ', this.newDate)
    newDate.setDate(newDate.getDate() - 1);
    console.log('newDate v2 is: ', newDate)
    var dateInput = new Date(newDate);
    console.log('dateInput is: ', dateInput)
    this.selectedDate = new Date(dateInput)
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
    this.gameDate = fullDate
    this.getGameList()
    },

      goToToday() {
      var currentDate = new Date();
      this.currentDate = currentDate;
      this.startDate(currentDate);
      this.picker = this.currentDate.toISOString().substr(0, 10)
      this.gameDate = this.picker
    },

    setGameDate() {
    var  setDate = new Date(this.gameDate)
    console.log('setDate is: ', setDate)
    var month = setDate.getMonth() + 1
    var day = setDate.getDate() 
    var year = setDate.getFullYear()
    var fullDate = month + ' / ' + day + ' / ' + year
    this.gameDate = fullDate
        console.log('the gameDate is: ', this.gameDate )
        this.showDate = false
    },

    async getGameInfo() {
      console.log(' starting getGameInfo', this.gameID)
      await EventService.getGameInfo(this.gameID)
      .then(
        (gameInfo => {
          this.gameInfo = gameInfo[0]
          this.gameID = gameInfo[0].GameID
          console.log('gameInfo[0].GameDate is: ', gameInfo[0].GameDate)
          this.gameDate = gameInfo[0].GameDate
            console.log('this.gameDate is: ', this.gameDate)
          this.selectedCourt = gameInfo[0].GameCourt -1;
          this.groupID = gameInfo[0].GameGroup;
          this.gameMinutes = gameInfo[0].GameMins;
         switch (gameInfo[0].GameStart) {
          case '6:00AM':
            this.gameStart = "06:00 am";
            break;
          case '6:30AM':
            this.gameStart = "06:30 am";
            break;
          case '7:00AM':
            this.gameStart = "07:00 am";
            break;
          case '7:30AM':
            this.gameStart = "07:30 am";
            break;
          case '8:00AM':
            this.gameStart = "08:00 am";
            break;
          case '8:30AM':
            this.gameStart = "08:30 am";
            break;
          case '9:00AM':
            this.gameStart = "09:00 am";
            break;
          case '9:30AM':
            this.gameStart = "09:30 am";
            break;
          case '10:00AM':
            this.gameStart = "10:00 am";
            break;
          case '10:30AM':
            this.gameStart = "10:30 am";
            break;
          case '11:00AM':
            this.gameStart = "11:00 am";
            break;
          case '11:30AM':
            this.gameStart = "11:30 am";
            break;
          case '12:00PM':
            this.gameStart = "12:00 m";
            break;
          case '12:30PM':
            this.gameStart = "12:30 pm";
            break;
          case '1:00PM':
            this.gameStart = "01:00 pm";
            break;
          case '1:30PM':
            this.gameStart = "01:30 pm";
            break;
          case '2:00PM':
            this.gameStart = "02:00 pm";
            break;
          case '2:30PM':
            this.gameStart = "02:30 pm";
            break;
          case '3:00PM':
            this.gameStart = "03:00 pm";
            break;
          case '3:30PM':
            this.gameStart = "03:30 pm";
            break;
          case '4:00PM':
            this.gameStart = "04:00 pm";
            break;
          case '4:30PM':
            this.gameStart = "04:30 pm";
            break;
          case '5:00PM':
            this.gameStart = "05:00 pm";
            break;
          case '5:30PM':
            this.gameStart = "05:30 pm";
            break;
          case '6:00PM':
            this.gameStart = "06:00 pm";
            break;
          case '6:30PM':
            this.gameStart = "06:30 pm";
            break;
          case '7:00PM':
            this.gameStart = "07:00 pm";
            break;
          case '7:30PM':
            this.gameStart = "07:30 pm";
            break;
          case '8:00PM':
            this.gameStart = "08:00 pm";
            break;
          case '8:30PM':
            this.gameStart = "08:30 pm";
            break;
          case '9:00PM':
            this.gameStart = "09:00 pm";
            break;
          case '9:30PM':
            this.gameStart = "09:30 pm";
            break;
        }
          console.log('this.gameStart is: ', this.gameStart)

        })
      )
      .then(() => {
          this.startDate(this.gameDate);
      });
    },

    async getGameList() {
      console.log(' starting getGameList')
      await EventService.getGameList(this.editDate, this.selectedCourt +1)
      .then(
        (gameReturn => {
          this.games = gameReturn
            console.log('gameReturn and this.games (full) are: ', gameReturn, this.games)
        })
      );
    },
    async getHourList() {
      await EventService.getHourList()
      .then(
        (hourReturn => {
          this.hourList = hourReturn
            console.log('this.hourList is: ', this.hourList)
        })
      );
    },

    async getGroups() {
      await EventService.getGroups(this.user.UserID)
      .then(
        (groupReturn => {
          this.groups = groupReturn
            console.log('this.hourList is: ', this.groups)
        })
      );
    },

    async saveGame() {
      this.errorMsg = '';
      if (!this.$refs.start.value) {
        this.errorMsg = "Missing start time"
        return
      }
      if (!this.$refs.minutes.value) {
        this.errorMsg = "Missing minutes of play"
        return
      }
      if (!this.$refs.group.value) {
        this.errorMsg = "Missing group"
        return
      }

      var gdt = new Date(this.gameDate)
      console.log('Starting saveGame: this.gameDate is: ', this.gameDate)
      console.log('this.gameStart.substr(6,4) is: ', this.gameStart.substr(6,4))
      console.log('am/pm is: ', this.gameStart.substr(6,1))
      console.log('gdt is: ', gdt)
      if (this.gameStart.substr(6,1) === 'p') {
        var newHours = Number(this.gameStart.substr(0,2)) + 12
        console.log('newHours is: ', newHours)
      } else {
        var newHours = Number(this.gameStart.substr(0,2))
        console.log('newHours is: ', newHours)
      }
      gdt.setHours(newHours)
      gdt.setMinutes(Number(this.gameStart.substr(3,2)))
      console.log('this.gameStart is: ', this.gameStart)
      gdt.setMinutes(Number(this.gameStart.substr(3,2)))
      gdt.setSeconds('00')
      console.log('this.gdt after hr, min set is: ', gdt)
      const gameEndTime = new Date(gdt.valueOf() + Number(this.gameMinutes) * 60000);
      console.log('gameEndTime is: ', gameEndTime)
      this.courtToAdd = this.selectedCourt + 1
     console.log('this.gameID, this.gameStart, gameEndTime, this.gameDate, this.groupID, this.selectedCourt: ', this.gameID, gdt, gameEndTime, this.groupID, this.selectedCourt, this.user.UserID)
        await EventService.editGame(this.gameID, gdt, gameEndTime, this.groupID, this.courtToAdd, this.user.UserID)
      .then((editResult) => {
        console.log('editResult is: ', editResult)
        if (editResult.returnValue === 9) {
          this.errorMsg = 'Time overlaps another game.'
        }
        console.log('starting GetGameList in')
        this.$router.push({ path: 'Home' })

      })
   },

    async getCourts() {
      console.log(' starting getCourts: ')
      await EventService.getCourts()
      .then(
        (courtsReturn => {
            console.log('courtsReturn is: ', courtsReturn)
            this.courts = courtsReturn;
            this.totalCourts = courtsReturn.length
            console.log('court list is: ', this.courts, this.totalCourts)
        })

      );
    },
    nextCourt() {
    this.selectedCourt = this.selectedCourt + 1;
   this.getGameList();
    },
    prevCourt() {
    this.selectedCourt = this.selectedCourt - 1;
    this.getGameList();
    }
    }
}

</script>
<style scoped>
.appBackground {
  background: url(../assets/pickleball.jpg) no-repeat center center fixed; 
}

.gameDate {
  max-width: 80%;
}
.grid {
   display: grid;
  justify-content: center;
  /* define the number of grid columns */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr) );
}

.Open {
  background-color: #a9e7fa;
}

.Closed {
  background-color: lightgray;
}

.Selected {
  background-color: lightyellow;
}

.selectStyle {
  max-width: 80%;
  margin-left: 1em;
}

.scheduledGames {
  max-width: 80%;
}
</style>
