<template>
  <div >

    <div v-for="day in days1" :key="day.ID" >
      <v-card class="yellow lighten-4">
        <v-card-title>
    <v-row class="mt-5">{{day.DayOfWeek}}, {{day.gameDate}} AM</v-row>
        </v-card-title>
        <v-card-text>

      <Day  v-bind:gameDate="day.gameDate" v-on:update-games="setDay1" />
        <v-expansion-panels v-if="day.amTemp">
    <v-expansion-panel class="mt-3">
      <v-expansion-panel-header>
        Weather
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        9:00 am - Temp: {{day.amTemp}}, Wind: {{day.amWind}}, Chance of rain: {{day.amRain}}
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
        </v-card-text>
      </v-card>
      <v-card class="blue lighten-4">
        <v-card-title>
    <v-row class="mt-5">{{day.DayOfWeek}}, {{day.gameDate}} PM</v-row>
        </v-card-title>
        <v-card-text>

      <Afternoon v-bind:gameDate="day.gameDate" v-on:update-games="setDay1" />
        <v-expansion-panels v-if="day.pmTemp">
    <v-expansion-panel class="mt-3">
      <v-expansion-panel-header>
        Weather
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        2:00 pm - Temp: {{day.pmTemp}}, Wind: {{day.pmWind}}, Chance of rain: {{day.pmRain}}
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
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
import axios from "axios"

export default ({
    name: "Main",

    components: {
      Day,
      Afternoon
    },

  data: function() {
    return {
      days1: [],
      dayNo: 0,
      dayofweek: '',
      earliestTime: '',
      weather: []
      
    }
  },

  mounted (){
 //   this.setDay1();
    this.getWeather();

  },

computed: {
  user(){
    return this.$store.state.user
    }    
  },

 methods: {
   
   async setDay1() {

     for (let i = 0; i < 10; i++) {
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
    if(i<3){
    var dayObj = {"ID": i, "gameDate": dayItem, "DayOfWeek": dayofweek, 
    "amTemp": this.weather.data.forecast.forecastday[i].hour[9].temp_f, 
    "pmTemp": this.weather.data.forecast.forecastday[i].hour[14].temp_f, 
    "amWind": this.weather.data.forecast.forecastday[i].hour[9].wind_mph, 
    "pmWind": this.weather.data.forecast.forecastday[i].hour[14].wind_mph,
    "amRain": this.weather.data.forecast.forecastday[i].hour[9].chance_of_rain,
    "pmRain": this.weather.data.forecast.forecastday[i].hour[14].chance_of_rain}
    this.days1.push(dayObj);} else 
    {
      var dayObj = {"ID": i, "gameDate": dayItem, "DayOfWeek": dayofweek}
      this.days1.push(dayObj);}
    }
        console.log('days1 is: ', this.days1)
     }
   ,

    async getWeather() {
      console.log('starting weather in main')
        const params = {
          key: '9a9a5cdaf4164cb99de181002210712',
          q: '66061',
          days: 10,
          aqi: 'no', 
          alerts: 'no'
        }
      console.log('weather params are: ', params)
      await axios.get('https://api.weatherapi.com/v1/forecast.json', {params})
      .then((weather) => {
        console.log('main weather is: ', weather);
        this.weather = weather
       console.log('this.weather is: ', this.weather)
      })
      .then(() => {
        this.setDay1();
      })

         },

   openTimes() {
     this.showTimes = true;
   }

 }

})

</script>

<style scoped>

</style>

