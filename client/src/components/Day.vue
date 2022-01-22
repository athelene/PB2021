
<template>
<div class="" >
  <h3 v-if="earliestTime !== '' && earliestTime !== null && earliestTime !== undefined"> Everyone can play starting {{earliestTime}} </h3>
  <h3 v-if="reservationCheck === true">Gym is Reserved</h3>
  <h3 v-if="insideCount > 0 || outsideCount >0 || flexCount > 0">Inside: {{insideCount}}, Outside: {{outsideCount}}, Flexible: {{flexCount}}</h3>
  <v-expansion-panels v-if="playerCount > 0">
    <v-expansion-panel    >
      <v-expansion-panel-header>
       <h3 >{{playerCount}} Player(s) Available 
         <span v-if="guestCount > 0"> with {{guestCount}} Guests</span></h3>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div v-for="player in playerList" :key="player.playerID" class="mt-2">
          <span v-if="player.MyReservation === 1"><strong>Reserved by: </strong></span>
           <a :href="'mailto:' + player.userEmail">{{player.userDisplayName}}</a>, 
           <a :href="'tel:' + player.userPhone">{{player.userPhone}}</a>, available starting: {{player.StartTime}}, location: {{player.LocationPref}}
           <span v-if="player.GuestCount > 0">, bringing {{player.GuestCount}} guest(s)</span>
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
          @click="setAvailable()"
        >
         Time/Location
        </v-btn> 

    <v-card v-if="openTime">
        <v-card-title>
    How early can you start? </v-card-title>
    <v-card-text>
      <v-form 
      ref="form"
    v-model="valid">
    <h3>{{errorMsg}}</h3>
        <v-select
          :items="startTime"
          :item-text="'display'"
          :item-value="'time'"
          label="Select the earliest time you are available"
          solo
          v-model="selectedTime"
          :rules="[(v) => !!v || 'Item is required']"
          required
        ></v-select>
        <v-select
          :items="locationPref"
          :item-text="'display'"
          :item-value="'locationPref'"
          label="Where do you prefer to play?"
          solo
          v-model="selectedLocation"
          :rules="[v => !!v || 'Item is required']"
          required
        ></v-select>
        
      <v-checkbox
      v-model="myReservation"
      label="I have reserved the gym"
    ></v-checkbox>
        <v-text-field
      v-model="newGuestCount"
      label="How many guests?"
      type="number"
    />
      </v-form>
    </v-card-text>
    <v-card-actions>
        <v-btn
         @click="saveTime()"
         :disabled="!valid"
         color="blue" >Save</v-btn> 
        <v-btn v-if="myTime !== ''" @click="openTime = false">Cancel</v-btn>
        <v-btn v-if="myTime === ''" @click="cancelChange()">Cancel</v-btn>
    </v-card-actions>
    </v-card>
  <v-expansion-panels v-if="noteCount > 0">
    <v-expansion-panel    >
      <v-expansion-panel-header>
       <h3 >{{noteCount}} Note(s)</h3>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div v-for="note in noteList" :key="note.noteID" class="mt-2">
          {{note.PlayerName}} - {{note.NoteDateDisp}}: {{note.NoteText}}
          <v-btn small icon v-if="note.PlayerID === user.UserID" @click="deleteNote(note.NoteID)">
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
    <v-dialog
      v-model="noteDialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="orange"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Add Note
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add a Note</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
              >
        <v-textarea
          v-model="newNoteText"
          label="Your note"
        ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="noteDialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addNote()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
    valid: false,
    errorMsg: '',
    startTime: [
        { time: "", display: "Select a time" },
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
    locationPref: [
      {locationPref: "", display: "Choose a location"},
      {locationPref: "Outside", display: "Outside Only"},
      {locationPref: "Inside", display: "Inside Only"},
       {locationPref: "Flexible", display: "Flexible"}
    ],
    selectedLocation: '',
    myLocation: '',
    myReservation: '',
    reservationCheck: false,
    earliestTime: '',
    playerCount: 0,
    playerList: '',
    insideCount: 0,
    outsideCount: 0,
    flexCount: 0,
    noteList: [],
    noteCount: 0,
    noteDialog: false,
    newNoteText: '',
    guestCount: 0,
    newGuestCount: 0,
  }),
  
  computed: {
  user(){
    return this.$store.state.user.user
  }
        
  },

  mounted (){
  //    console.log('incoming gameDate is: ', this.gameDate)
       this.getMyTime();
       this.getEarliestTime()
       this.getPlayerCount();
       this.getNotes();

  },

  methods: {
      async setAvailable() {
      this.openTime = true;
      this.selectedLocation = '';
      this.selectedTime = '';
      },


      async cancelChange() {
        this.getMyTime();
        this.openTime = false;
      },

      async setResign() {
          this.available = false;
          this.openTime = false;
        await EventService.resignMyGame(this.user.UserID, this.gameDate, 'A')
      .then(
        (() => {
  //          console.log('resigned')
       this.getMyTime();
       this.getEarliestTime()
       this.getPlayerCount();
        })
      );
      },

      async saveTime(){
        this.$refs.form.validate()
  //      console.log('saveTime location, time', this.selectedLocation, this.selectedTime)

          this.openTime = false;
          this.available = true;
          if(this.myReservation === true){ var myReservation = 1} else {var myReservation = 0}
  //        console.log('the time saved, userID will be: ', this.selectedTime, this.user.UserID, this.selectedLocation, myReservation)
        await EventService.setMyTime(this.user.UserID, this.selectedTime, this.gameDate, 'A', this.selectedLocation, myReservation, this.newGuestCount)
      .then(
        (() => {
  //          console.log('selectedTime is : ', this.selectedTime, this.selectedLocation, myReservation)
       this.getMyTime();
       this.getEarliestTime()
       this.getPlayerCount();
       this.selectedLocation = '';
      this.selectedTime = '';
        })
      );
      },

      async getMyTime(){
        await EventService.getMyTime(this.user.UserID, this.gameDate, 'A')
      .then(
        ((myTime) => {
          this.selectedTime = myTime.StartTime2
    //      console.log('myTime.recordsets[0][0] for', this.gameDate, 'A  is : ', myTime.recordsets[0][0])
       if (myTime.recordsets[0].length !== 0 && myTime.recordsets[0] !== '' &&  myTime.recordsets[0] !== undefined) {
    //          console.log('myTime.recordsets[0][0] is: '), myTime.recordsets[0][0]
            this.available = true
            this.myTime = myTime.recordsets[0][0].StartTime
            this.myLocation = myTime.recordsets[0][0].LocationPref
            if (myTime.recordsets[0][0].Ireserved === 1) {this.myReservation = true} else {this.myReserveration = false}
    //        console.log('this.myTime, myLocation, myReservation is set to: ', this.myTime, this.myReservation)
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
  //        console.log('earliest from ES is : ', earliest)
          this.earliestTime = earliest.recordsets[0][0].StartTime2
  //          console.log('earliestTime rec from ES A is : ',  this.earliestTime)
        } else {
          this.earliestTime = '';
        }
        })
      );
   },

        async getPlayerCount() {
          this.guestCount = 0;
       await EventService.getPlayerCount(this.gameDate, 'A')
      .then(
        ((playerCountRes) => {
  //        console.log('playerCountRes.recordset for', this.gameDate, 'A  is : ', playerCountRes.recordset)
          this.playerCount = playerCountRes.output.playerCount
        playerCountRes.recordset.forEach((rec) => {
          this.guestCount = this.guestCount + Number(rec.GuestCount)
          console.log('this.guestCount is now: ', this.guestCount)
        })
      this.playerList = playerCountRes.recordset
            console.log('PlayerList is: ', this.playerList, 'and playerCount is:', this.playerCount )

      //see if gym is reserved
      if (this.playerList.filter(function(e) { return e.MyReservation === 1; }).length > 0) {
        this.reservationCheck = true
      } else {this.reservationCheck = false}

      //get inside/outside count
      var insideCount = 0
      var outsideCount = 0
      var flexCount = 0
      this.playerList.forEach(element => {
  //      console.log('LocationPref is: ', element.LocationPref)
        if (element.LocationPref === 'Inside') {
          insideCount = ++insideCount

        }
        if (element.LocationPref === 'Outside') {
  //        console.log('adding an outside count')
          outsideCount = ++outsideCount
        }
        if (element.LocationPref === 'Flexible') {
  //        console.log('adding a flexible count')
          flexCount = ++flexCount
        }
      });
        this.insideCount = insideCount;
        this.outsideCount = outsideCount;
        this.flexCount = flexCount;
  //      console.log('location counts are: ', insideCount, outsideCount, flexCount)
        })
      );
      },

        async addNote() {
       await EventService.addNote(this.gameDate, 'A', this.user.UserID, this.newNoteText)
      .then(
        (() => {
            this.newNoteText = '';
            this.noteDialog = false;
            this.getNotes();
        })
      );
   },

          async deleteNote(noteID) {
       await EventService.deleteNote(noteID)
      .then(
        (() => {
            this.getNotes();
        })
      );
   },



    async getNotes() {
//      console.log(' starting getNotes')
      await EventService.getNotes(this.gameDate, 'A')
      .then(
        (notes => {
//            console.log('gameNotes back from ES is: ', notes)
          this.noteList = notes.recordset;
          this.noteCount = notes.recordset.length;
//          console.log('this.noteCount is:' , this.noteCount)
        })
      );
    },

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
