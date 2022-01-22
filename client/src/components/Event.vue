
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
    eventStatus: false
  }),
  
  computed: {
  user(){
    return this.$store.state.user
  }
        
  },

  mounted (){
 //     console.log('incoming eventID is: ', this.eventID)
    this.getEvent();
    this.getEventStatus();
    this.getAttendees();
  },

  methods: {

    async getEvent() {
  //    console.log(' starting getEvent')
      await EventService.getEvent(this.eventID)
      .then(
        (event => {
//            console.log('event back from ES is: ', event[0])
          this.event = event[0];
//          console.log('this.event is: ', this.event)

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
  //    console.log(' starting getEvent')
      await EventService.getEventStatus(this.eventID, this.user.user.UserID)
      .then(
        (eventStatus => {
//            console.log('event back from ES is: ', eventStatus)
          this.eventStatus = eventStatus;
//          console.log('this.eventStatus is: ', this.eventStatus)

        })
      );
    },

    async acceptRsvp() {
  //    console.log(' starting acceptRsvp')
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
  //    console.log(' starting cancelRsvp')
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
  //    console.log(' starting getEvent')
      await EventService.getAttendees(this.eventID)
      .then(
        (attendees => {
 //           console.log('event back from ES is: ', attendees)
          this.attendees = attendees;
          this.attendeesCount = attendees.length;
//          console.log(attendees.length, this.attendeesCount)
//          console.log('this.attendees is: ', this.attendees)

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
