<template>
  <div class="text-center" >
    <h1 class="ml-5 headingColor">Events</h1>
<v-dialog
      v-model="newEventDialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Add a Divas Event
        </v-btn>
      </template>
      <v-card>
        <v-card-subtitle class="primary">
          <span class="text-h5">Add Event</span>
        </v-card-subtitle>
        <v-card-text>
          <v-container>
                <v-form ref="addForm" >
                <v-row>
                  <v-text-field
                    v-model="newTitle"
                    type="text"
                    label="Event title"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="newLocation"
                    label="Event location"
                  ></v-text-field>
                </v-row>
                <v-row>
    <v-date-picker
      v-model="newDate"
      class="mt-4"
      min="2016-06-15"
    ></v-date-picker>
                </v-row>
                <v-row>
                  <v-text-field
                    v-model="newTime"
                    label="Event time"
                  ></v-text-field>
                </v-row>
                <v-row>
                  <v-checkbox
                    v-model="newBringing"
                    label="Invite people to bring things?"
                  ></v-checkbox>  
                </v-row>
                <v-row>
                <v-textarea
                  v-model="newDetails"
                      filled
                      auto-grow
                      label="Details:"
                      hint="include what to bring, parking, etc."
                      rows="2"
                      row-height="20"
                    ></v-textarea>
                </v-row>
                </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="closeNewEventDialog()"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addEvent()"
          >
           Save/Send Invitation
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

 <Event v-for="event in events" :key="event.EventID" :eventID="event.EventID" @update-event="getEvents"/>
  </div>
</template>

<script>
import EventService from '../Services/EventServices'
import Event from '../components/Event.vue'

export default {
    name: "EventList",
    components: {
      Event
    },
    data: function() {
    return {
      events: [],
      navTitle: 'Events',
      newEventDialog: false,
       newTitle: '',
       newLocation: '',
       newDate: '',
       newTime: '',
       newBringing: false,
       newDetails: '',
       rsvpStatus: false,
    }
  },
computed: {
  user(){
    return this.$store.state.user
  },
      
  },

mounted() {
  console.log('eventlist is running')
  if(!this.user || this.user.length === 0) {
     this.$router.push('/')
   }
    this.getEvents();

},
methods: {

    async getEvents() {
      await EventService.getEvents()
      .then(
        (eventsReturn => {
          this.events= eventsReturn
        })
      );
    },

    async addEvent() {
      if (this.newBringing === true) {
        var bringing = 1
      } else {
        var bringing = null
      }
      await EventService.addEvent(this.newTitle, this.user.user.UserID, this.newLocation, this.newDate, this.newTime.slice(0,10), bringing, this.newDetails)
      .then(() => {
        this.getEvents();
        this.closeNewEventDialog();
      })
    },

    closeNewEventDialog() {
      this.newTitle = '';
      this.newLocation = '';
      this.newDate = '';
      this.newTime = '';
      this.newDetails = '';
      this.newBringing = false;
      this.newEventDialog = false;
    },

    }
}

</script>
<style scoped>
.appBackground {
  background: url(../assets/pickleball.jpg) no-repeat center center fixed; 
  height: 100%;
}

.cardBackground {
  background-color: #fcf0f8;
}

.headingColor {
  color: #fcf0f8;
}

.Selected {
  background-color: lightyellow;
}

</style>
