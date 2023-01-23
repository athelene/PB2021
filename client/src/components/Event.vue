
<template>
<div class="" >
  <v-card 
      class="mx-auto mb-5 mt-3 cardBackground"
      max-width="344"
      elevation="2"
    >
    <v-card-Title>{{event.EventDate}} -- {{event.EventTitle}}</v-card-Title>
    <v-card-text>
      <p>Hosted by: <a :href="'mailto:' + event.UserEmail">{{event.EventHostess}}</a>, 
        <a :href="'tel:' + event.userPhone">{{event.userPhone}}</a></p>
      <p>Time: {{event.EventTime}}</p>
      <p>Location: {{event.EventLocation}}</p>
      <p>Details: {{event.EventDetails}}</p>
    </v-card-text>
    <v-card-text>
        <v-expansion-panels>
    <v-expansion-panel >
      <v-expansion-panel-header>
       {{attendeesCount}} Attendees
        
      </v-expansion-panel-header>
      <v-expansion-panel-content >
        <v-divider></v-divider>
      <div v-for="attendee in attendees"
      :key="attendee.UserID" class="mt-3">
              <v-row>
        <p>{{attendee.UserDisplayName}}</p>
        <!-- <v-btn icon><v-icon>mdi-trash-can-outline</v-icon></v-btn> -->
      </v-row>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
    </v-card-text>

      <!--start of notes section-->
      <v-expansion-panels v-if="noteCount > 0">
    <v-expansion-panel    >
      <v-expansion-panel-header>
       <h3 >{{noteCount}} Note(s)</h3>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div v-for="note in noteList" :key="note.noteID" class="mt-2">
          {{note.PlayerName}} - {{note.NoteDateDisp}}: {{note.NoteText}} 
          <v-btn small icon v-if="note.PlayerID === user.user.UserID" @click="deleteNote(note.NoteID)">
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
          Add Event Note
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <span class="text-h4">Add event note</span> 
        </v-card-text>
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
            @click="addEventNote()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  <!--end of notes section-->
    <v-card-actions>
      <v-btn small @click="acceptRsvp()" v-if="eventStatus===false" class="orange white--text">Accept</v-btn>
      <v-btn small @click="cancelRsvp()" v-if="eventStatus===true" class="orange white--text">Cancel</v-btn>
      <v-spacer></v-spacer>
        <v-btn small icon v-if="event.UserID === user.user.UserID" @click="deleteEvent(event.EventID)">
          <v-icon class="orange--text">mdi-trash-can-outline</v-icon></v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>


<script>
import EventService from '../Services/EventServices'


export default {
  name: "EventList",
  props: ['eventID'],
  data: () => ({
    rsvp: false,
    attendees: [],
    attendeesCount: 0,
    event: [],
    eventStatus: false,
    noteList: [],
    noteCount: 0,
    noteDialog: false,
    newNoteText: '',
  }),
  
  computed: {
  user(){
    return this.$store.state.user
  }
        
  },

  mounted (){
    console.log('user is: ', this.user.user.UserID)
    this.getEvent();
    this.getEventStatus();
    this.getAttendees();
    this.getEventNotes();
  },

  methods: {

    async getEvent() {
      await EventService.getEvent(this.eventID)
      .then(
        (event => {
          this.event = event[0];
        })
      );
    },
    async deleteEvent(eventID) {
      await EventService.deleteEvent(eventID)
      .then(
        (() => {
           this.$emit('update-event')
        })
      );
    },
    async getEventStatus() {
      await EventService.getEventStatus(this.eventID, this.user.user.UserID)
      .then(
        (eventStatus => {
          this.eventStatus = eventStatus;
        })
      );
    },

    async acceptRsvp() {
      await EventService.acceptRsvp(this.eventID, this.user.user.UserID)
      .then(
        (() => {
          this.getEventStatus();
          this.getAttendees();
           this.$emit('update-event')
        })
      );
    },

    async cancelRsvp() {
      await EventService.cancelRsvp(this.eventID, this.user.user.UserID)
      .then(
        (() => {
          this.getEventStatus();
          this.getAttendees();
           this.$emit('update-event')
        })
      );
    },

    async getAttendees() {
      await EventService.getAttendees(this.eventID)
      .then(
        (attendees => {
          this.attendees = attendees;
          this.attendeesCount = attendees.length;
        })
      );
    },

    async addEventNote() {
      console.log('in event.vue addEventNote user is: ', this.user.user.UserID)
       await EventService.addEventNote(this.eventID, this.user.user.UserID, this.newNoteText)
      .then(
        (() => {
            this.newNoteText = '';
            this.noteDialog = false;
            this.getEventNotes();
        })
      );
   },

          async deleteNote(noteID) {
       await EventService.deleteEventNote(noteID)
      .then(
        (() => {
            this.getEventNotes();
        })
      );
   },

    async getEventNotes() {
      await EventService.getEventNotes(this.eventID)
      .then(
        (notes => {
          this.noteList = notes.recordset;
          this.noteCount = notes.recordset.length;
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
