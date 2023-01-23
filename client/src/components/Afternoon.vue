
<template>
<div class="" >
<v-btn v-if="((playerCount < 4 && playerCount > 0) && invitedBtn === true && (gameID === 1 || gameID === 2))" @click="inviteFriends()">Invite Friends</v-btn>     
<h3 v-if="earliestTime !== '' && earliestTime !== null && earliestTime !== undefined"> Everyone can play starting {{earliestTime}} </h3>        
  <h3 v-if="reservationCheck === true">Gym is Reserved</h3>
  <h3 v-if="insideCount > 0 || outsideCount >0 || flexCount > 0">Inside: {{insideCount}}, Outside: {{outsideCount}}, Flexible: {{flexCount}}</h3>
 <div v-if="invitedMsg.length > 0"><h3> {{invitedMsg}}</h3></div>
  <v-expansion-panels v-if="playerCount > 0">
    <v-expansion-panel    >
      <v-expansion-panel-header>
       <h3 >{{playerCount}} Player(s) Available
       <span v-if="guestCount > 0"> with {{guestCount}} Guests</span></h3>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div v-for="player in playerList" :key="player.playerID">
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
         Join PM
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
         Change
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
          Add PM Note
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add game note to players</span>
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
  name: "Afternoon",
  props: ['gameDate', 'gameID'],
  data: () => ({
    available: false,
    openTime: false,
    valid: false, 
    errorMsg: '',
    startTime: [
        { time: "12:00:00", display: " 12:00PM" },
        { time: "12:30:00", display: " 12:30PM" },
        { time: "13:00:00", display: " 1:00PM" },
        { time: "13:30:00", display: " 1:30PM" },
        { time: "14:00:00", display: " 2:00PM" },
        { time: "14:30:00", display: " 2:30PM" },
        { time: "15:00:00", display: " 3:00PM" },
        { time: "15:30:00", display: " 3:30PM" },
        { time: "16:00:00", display: " 4:00PM" },
        { time: "16:30:00", display: " 4:30PM" },
        { time: "17:00:00", display: " 5:00PM" },
        { time: "17:30:00", display: " 5:30PM" },
        { time: "18:00:00", display: " 6:00PM" },
        { time: "18:30:00", display: " 6:30PM" },
        { time: "19:00:00", display: " 7:00PM" },
        { time: "19:30:00", display: " 7:30PM" },
        { time: "20:00:00", display: " 8:00PM" },
        { time: "20:30:00", display: " 8:30PM" },
        { time: "21:00:00", display: " 9:00PM" }
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
    invitedBtn: false,
    invitedMsg: '',
  }),
  
  computed: {
  user(){
    return this.$store.state.user.user
  }
        
  },

  mounted (){
      this.getMyTime();
      this.getEarliestTime();
      this.getPlayerCount();
      this.getNotes();
      this.getInvitedFriends();

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
        await EventService.resignMyGame(this.user.UserID, this.gameDate, 'P')
      .then(
        (() => {
       this.getMyTime();
       this.getEarliestTime()
       this.getPlayerCount();
       this.getInvitedFriends()
        })
      );
      },

      async saveTime(){
        this.$refs.form.validate()
          this.openTime = false;
          this.available = true;
          if(this.myReservation === true){ var myReservation = 1} else {var myReservation = 0}
        await EventService.setMyTime(this.user.UserID, this.selectedTime, this.gameDate, 'P', this.selectedLocation, myReservation, this.newGuestCount)
      .then(
        (() => {
       this.getMyTime();
       this.getEarliestTime()
       this.getPlayerCount();
       this.getInvitedFriends();
       this.selectedLocation = '';
      this.selectedTime = '';

        })
      );
      },

      async getMyTime(){
        await EventService.getMyTime(this.user.UserID, this.gameDate, 'P')
      .then(
        ((myTime) => {
          this.selectedTime = myTime.StartTime2
       if (myTime.recordsets[0].length !== 0 && myTime.recordsets[0] !== '' &&  myTime.recordsets[0] !== undefined) {
            this.available = true
            this.myTime = myTime.recordsets[0][0].StartTime
            if (myTime.recordsets[0][0].Ireserved === 1) {this.myReservation = true} else {this.myReserveration = false}
          } else {
            this.available = false;
            this.myTime = '';
          }
        })
      );
      },

        async getEarliestTime() {
       await EventService.getEarliestTime(this.gameDate, 'P')
      .then(
        ((earliest) => {
            if(earliest.recordsets[0].length > 0) {
          this.earliestTime = earliest.recordsets[0][0].StartTime2
        } else {
            this.earliestTime = '';
        }
        })
      );
   },

        async getPlayerCount() {
          this.guestCount = 0;
       await EventService.getPlayerCount(this.gameDate, 'P')
      .then(
        ((playerCountRes) => {
          this.playerCount = playerCountRes.output.playerCount
          playerCountRes.recordset.forEach((rec) => {
          this.guestCount = this.guestCount + Number(rec.GuestCount)
        })
        this.playerList = playerCountRes.recordset

      //see if gym is reserved
      if (this.playerList.filter(function(e) { return e.MyReservation === 1; }).length > 0) {
        this.reservationCheck = true
      } else {this.reservationCheck = false}

      //get inside/outside count
      var insideCount = 0
      var outsideCount = 0
      var flexCount = 0;
      this.playerList.forEach(element => {
        if (element.LocationPref === 'Inside') {
          insideCount = ++insideCount

        }
        if (element.LocationPref === 'Outside') {
          outsideCount = ++outsideCount
        }
        if (element.LocationPref === 'Flexible') {
          flexCount = ++flexCount
        }
      });
        this.insideCount = insideCount;
        this.outsideCount = outsideCount;
        this.flexCount = flexCount;
        })
      )
      .then(() => {
        this.getInvitedFriends()
      });
      },
      
        async addNote() {
       await EventService.addNote(this.gameDate, 'P', this.user.UserID, this.newNoteText)
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
      await EventService.getNotes(this.gameDate, 'P')
      .then(
        (notes => {
          this.noteList = notes.recordset;
          this.noteCount = notes.recordset.length;
        })
      );
    },

  async inviteFriends() {

       await EventService.inviteFriends(this.gameDate, 'P', this.user.UserID)
      .then(
        (() => {
          
          this.invitedBtn = false
          this.invitedMsg = 'Invitation sent to friends'
        })
      );
   },

  async getInvitedFriends() {
    if((this.playerCount < 4 && this.playerCount > 0) && (this.gameID === 1 || this.gameID === 2)) {
       await EventService.getInvitedFriends(this.gameDate, 'P')
       .then(
         ((response) => {
           if(response.length > 0){

           this.invitedBtn = false
          this.invitedMsg = 'Invitation sent to friends'
                          } else {
             this.invitedBtn = true
             this.invitedMsg = ''
           }
         })
       )
    }
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
