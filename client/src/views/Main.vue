<template>
  <div >

    <div v-for="day in days1" :key="day.ID" >
      <v-card class="yellow lighten-4">
        <v-card-title>
    <v-row class="mt-5">{{day.DayOfWeek}}, {{day.gameDate}} AM</v-row>
        </v-card-title>
        <v-card-text>
      <Day  v-bind:gameDate="day.gameDate" v-on:update-games="setDay1" />
        </v-card-text>
      </v-card>
      <v-card class="blue lighten-4">
        <v-card-title>
    <v-row class="mt-5">{{day.DayOfWeek}}, {{day.gameDate}} PM</v-row>
        </v-card-title>
        <v-card-text>
      <Afternoon v-bind:gameDate="day.gameDate" v-on:update-games="setDay1" />
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
    </div>

  </div>
</template>

<script>
//import EventService from '../Services/EventServices'
import Day from '../components/Day.vue'
import Afternoon from '../components/Afternoon.vue'

export default ({
    name: "Main",

    components: {
      Day,
      Afternoon
    },

  data: function() {
    return {
      days1: [],
      days2: [],
      dayNo: 0,
      dayofweek: '',
      earliestTime: ''
      
    }
  },

  mounted (){
    this.setDay1();

  },

computed: {
  user(){
    return this.$store.state.user
  }
        
  },

 methods: {
   
   async setDay1() {

     for (let i = 0; i < 3; i++) {
       var d1 = new Date()
       d1.setDate(d1.getDate() + i);

    var d = new Date(d1),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    var dow = d.getDay();
    console.log(dow)
    var dayofweek = '';
    switch(dow) {
      case 0:
        dayofweek = 'Sunday'
        break;
      case 1:
        dayofweek = 'Monday'
        break;
      case 2:
        dayofweek = 'Tuesday'
        break;
      case 3:
        dayofweek = 'Wednesday'
        break;
      case 4:
        dayofweek = 'Thursday'
        break;
      case 5:
        dayofweek = 'Friday'
        break;
      case 6:
        dayofweek = 'Saturday'
        break;
      default:
        // code block
}
    var dayItem =  [year, month, day].join('-');
    var dayObj = {"ID": i, "gameDate": dayItem, "DayOfWeek": dayofweek}
    this.days1.push(dayObj);
     }
    console.log('days1 is: ', this.days1)
   },


   openTimes() {
     this.showTimes = true;
   },


}
})
</script>

<style scoped>

</style>

