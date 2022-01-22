<template>
  <div >

    <div v-for="day in days1" :key="day.ID" >
  <v-row justify="center">
      <v-card class="pink lighten-5 mx-auto mt-3 ml-3 mr-3"  width="65%">
        <v-card-title>
    <v-row class="mt-5">{{day.DayOfWeek}}, {{day.gameDate}} AM       
      <v-btn icon @click="openWeather(day.ID, 'A')">        
          <v-img
            max-height="50"
            max-width="50"
            :src="day.am1Icon"
          ></v-img></v-btn></v-row>  
        <br />
          <div v-if="seeAmWeather===day.ID">
           <h6> 8:00 am - Temp: {{day.am1Temp}}, Wind: {{day.am1Wind}}, Rain: {{day.am1Rain}}%, Snow: {{day.am1Snow}}%</h6>
           <h6> 10:00 am - Temp: {{day.am2Temp}}, Wind: {{day.am2Wind}}, Rain: {{day.am2Rain}}%, Snow: {{day.am2Snow}}%</h6>
          </div>
        </v-card-title>
        <v-card-text class="mb-1">

      <Day  v-bind:gameDate="day.gameDate" v-on:update-games="setDay1" />
        </v-card-text>
      </v-card>
      </v-row>
      <v-row justify="center" class="mt-2 mb-5">
      <v-card class="blue lighten-5 mx-auto mb-5 mt-1 ml-3 mr-3"  width="65%">
        <v-card-title>
    <v-row >{{day.DayOfWeek}}, {{day.gameDate}} PM
       <v-btn icon @click="openWeather(day.ID, 'P')">          
          <v-img
            max-height="50"
            max-width="50"
            :src="day.pmIcon"
          ></v-img></v-btn> </v-row> 
        <br />
           <div v-if="seePmWeather===day.ID">
           <h6> 2:00 pm - Temp: {{day.pmTemp}}, Wind: {{day.pmWind}}, Chance of rain: {{day.pmRain}}, Snow: {{day.pmSnow}}%</h6>
           <h6> 6:00 pm - Temp: {{day.niteTemp}}, Wind: {{day.niteWind}}, Chance of rain: {{day.niteRain}}, Snow: {{day.niteSnow}}%</h6>
          </div>
        </v-card-title>
        <v-card-text class="mb-5">

      <Afternoon v-bind:gameDate="day.gameDate" v-on:update-games="setDay1" />

        </v-card-text>
      </v-card>
      </v-row>
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
      weather: [],
      amWeatherOpen: false,
      pmWeatherOpen: false,
      seeAmWeather: -1,
      seePmWeather: -1
      
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
  //  console.log(dow)
    var dayofweek = '';
    switch(dow) {
      case 0:
        dayofweek = 'Sun'
        break;
      case 1:
        dayofweek = 'Mon'
        break;
      case 2:
        dayofweek = 'Tue'
        break;
      case 3:
        dayofweek = 'Wed'
        break;
      case 4:
        dayofweek = 'Thu'
        break;
      case 5:
        dayofweek = 'Fri'
        break;
      case 6:
        dayofweek = 'Sat'
        break;
      default:
        // code block
}
    var dayItem =  [year, month, day].join('-');
    if(i<3){
    var dayObj = {"ID": i, "gameDate": dayItem, "DayOfWeek": dayofweek, 
    "am1Temp": this.weather.data.forecast.forecastday[i].hour[8].temp_f, 
    "am2Temp": this.weather.data.forecast.forecastday[i].hour[10].temp_f, 
    "pmTemp": this.weather.data.forecast.forecastday[i].hour[14].temp_f, 
    "am1Wind": this.weather.data.forecast.forecastday[i].hour[8].wind_mph, 
    "am2Wind": this.weather.data.forecast.forecastday[i].hour[10].wind_mph, 
    "pmWind": this.weather.data.forecast.forecastday[i].hour[14].wind_mph,
    "am1Rain": this.weather.data.forecast.forecastday[i].hour[8].chance_of_rain,
    "am2Rain": this.weather.data.forecast.forecastday[i].hour[10].chance_of_rain,
    "pmRain": this.weather.data.forecast.forecastday[i].hour[14].chance_of_rain,
    "am1Snow": this.weather.data.forecast.forecastday[i].hour[8].chance_of_snow,
    "am2Snow": this.weather.data.forecast.forecastday[i].hour[10].chance_of_snow,
    "pmSnow": this.weather.data.forecast.forecastday[i].hour[14].chance_of_snow,
    "am1Icon": this.weather.data.forecast.forecastday[i].hour[8].condition.icon, 
    "am2Icon": this.weather.data.forecast.forecastday[i].hour[10].condition.icon,
    "pmIcon": this.weather.data.forecast.forecastday[i].hour[14].condition.icon,
    "niteTemp": this.weather.data.forecast.forecastday[i].hour[18].temp_f, 
    "niteWind": this.weather.data.forecast.forecastday[i].hour[18].wind_mph, 
    "niteRain": this.weather.data.forecast.forecastday[i].hour[14].chance_of_rain,
    "niteSnow": this.weather.data.forecast.forecastday[i].hour[14].chance_of_snow,}
    this.days1.push(dayObj);} else 
    {
      var dayObj = {"ID": i, "gameDate": dayItem, "DayOfWeek": dayofweek}
      this.days1.push(dayObj);}
    }
        console.log('days1 is: ', this.days1)
     }
   ,

    async getWeather() {
    //  console.log('starting weather in main')
        const params = {
          key: '9a9a5cdaf4164cb99de181002210712',
          q: '66061',
          days: 10,
          aqi: 'no', 
          alerts: 'no'
        }
  //    console.log('weather params are: ', params)
      await axios.get('https://api.weatherapi.com/v1/forecast.json', {params})
      .then((weather) => {
  //      console.log('main weather is: ', weather);
        this.weather = weather
  //     console.log('this.weather is: ', this.weather)
      })
      .then(() => {
        this.setDay1();
      })

         },

   openTimes() {
     this.showTimes = true;
   },

   openWeather(id, ampm){
     if(ampm === 'A') {
     if(this.seeAmWeather !== id) {
     this.seeAmWeather = id
     this.seePmWeather = -1} else 
     {this.seeAmWeather = -1} } else

     if(this.seePmWeather !== id) {
     this.seePmWeather = id
     this.seeAmWeather = -1} else 
     {this.seePmWeather = -1} 
   }

 }

})

</script>

<style scoped>

</style>

