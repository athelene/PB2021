<template>
  <div >
  <v-tabs>
    <!-- Week One Tab -->
    <v-tab>This Week</v-tab>
      <v-tab-item class="ml-4" >
        <v-row class="mt-5">Sunday, 11/3/2021, no players avail</v-row>
        <v-switch 
        v-model="sunday"
        label="Playing?"
      ></v-switch>
      <v-divider></v-divider>
        <v-row class="mt-5">Monday, 11/4/2021, 3 players avail starting 9 am</v-row>
        <v-switch 
        v-model="monday"
        label="Playing?"
      ></v-switch>
      <v-divider></v-divider>
        <v-row class="mt-5">Tuesday, 11/5/2021, 2 players avail starting 10:30 am</v-row>
        <v-switch 
        v-model="tuesday"
        label="Playing?"
      ></v-switch>
      <v-divider></v-divider>
        <v-row class="mt-5">Wednesday, 11/5/2021, 2 players avail starting 10:30 am</v-row>
        <v-switch 
        v-model="wednesday"
        label="Playing?"
      ></v-switch>
      <v-divider></v-divider>
        <v-row class="mt-5">Thursday, 11/5/2021, 2 players avail starting 10:30 am</v-row>
        <v-switch 
        v-model="thursday"
        label="Playing?"
      ></v-switch>
      <v-divider></v-divider>
        <v-row class="mt-5">Friday, 11/5/2021, 2 players avail starting 10:30 am</v-row>
        <v-switch 
        v-model="friday"
        label="Playing?"
      ></v-switch>
      <v-divider></v-divider>
        <v-row class="mt-5">Saturday, 11/5/2021, 2 players avail starting 10:30 am</v-row>
        <v-switch 
        v-model="saturday"
        label="Playing?"
      ></v-switch>

      </v-tab-item>


    <v-tab>Next Week</v-tab>
      <v-tab-item>stuff in next week</v-tab-item>
  </v-tabs>
  </div>
</template>

<script>
//import EventService from '../Services/EventServices'

export default ({
    name: "Main",

  data: function() {
    return {
      available: false,
      reserved: false,
      openMonday: false,
      timeSlots: ['7:00am', '7:30am', '8:00am'],
      dialog: false,
      playing: false,
      showTimes: false,
      myTime: '',
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      
    }
  },

  mounted (){

  },

computed: {
  user(){
    return this.$store.state.user
  }
        
  },

 methods: {
   setAvailable() {
     this.available = this.available
     if (this.available === true) {
       this.showTimes = true
     } else {
       this.showTimes = false
     }
   },
   saveTime() {
     this.dialog = false;
     this.showTimes = false;
     console.log('myTime is: ', this.myTime)
   },
   openTimes() {
     this.showTimes = true;
   }
}
})
</script>

<style scoped>

</style>

