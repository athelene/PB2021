
<template>
<div >
<div v-if="group.GroupType === 1">
    <v-switch ml-2
      v-if="switch1 === true"
       color="blue"
      @click="changeGroupStatus()"
      v-model="switch1"
      label="You are a member"
    ></v-switch>
      <v-switch v-if="switch1 !== true"
       color="blue"
      @click="changeGroupStatus()"
      v-model="switch1"
      label="You are not a member"
    ></v-switch>
</div>
  <v-expansion-panels >
    <v-expansion-panel 
    >
      <v-expansion-panel-header class="blueBall">
        {{groupPlayers.length}} Players
      </v-expansion-panel-header>
      <v-expansion-panel-content class="blueBall">
          <div v-for="player in groupPlayers" :key="player.GroupPlayerID">
       {{player.UserDisplayName}} - ({{player.userPhoneAreaCode}} {{player.userPhonePrefix}}-{{player.userPhoneLine}})
          </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  </div>
</template>


<script>
import EventService from '../Services/EventServices'

export default {
  name: "GroupPlayers",
  props: ['group'],
  data: () => ({
    playerStatus: false,
    groupPlayers: [],
    switch1: false,
    panel: true,
    playerGroups: [],
    
  }),
      computed: {
  user(){
    return this.$store.state.user
  }
        
  },

  mounted (){
    this.getGroupPlayers();
    this.getGroupStatus();
    this.getPlayerGroups();

  },

  methods: {

    async getGroupPlayers() {
      console.log(' starting getGroupPlayers')
      await EventService.getGroupPlayers(this.group.GroupID)
      .then(
        (groupPlayers => {
          this.groupPlayers = groupPlayers
            console.log('groupPlayers : ', groupPlayers, this.groupPlayers)
        })
      );
    },

    async getGroupStatus() {
      console.log(' starting getGroupStatus')
      await EventService.getGroupStatus(this.group.GroupID, this.user.UserID)
      .then(
        (groupStatus => {
            if(groupStatus.length > 0) {
                this.switch1 = true
            } else {
                this.switch1 = false
            }

        })
      );
    },

    async changeGroupStatus() {
      console.log(' starting changeGroupStatus')
      this.switch1 = !this.switch1
      console.log('before running service, switch is: ', this.switch1)
      await EventService.changeGroupStatus(this.group.GroupID, this.user.UserID, this.switch1)
      .then(
        (groupStatus => {
            this.getGroupStatus();
            this.getGroupPlayers();
            this.getPlayerGroups();

        })
      );
    },

    async getPlayerGroups() {
      console.log(' starting getPlayerGroups')
      await EventService.getPlayerGroups(this.user.UserID)
      .then(
        (playerGroups => {
          this.playerGroups = playerGroups
            console.log('playerGroups are: ', playerGroups, this.playerGroups)
        })

      );
    },

  }

};
</script>
<style scoped>
.blueBall {
  background-color: #99dff5;
}
</style>