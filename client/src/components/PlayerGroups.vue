
<template>
<div >

  <v-expansion-panels >
    <v-expansion-panel 
    >
      <v-expansion-panel-header class="blueBall">
        Player is in {{playerGroups.length}} Groups
      </v-expansion-panel-header>
      <v-expansion-panel-content class="blueBall">
          <div v-for="group in playerGroups" :key="group.GroupID">
       {{group.GroupName}}
          </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  </div>
</template>


<script>
import EventService from '../Services/EventServices'

export default {
  name: "PlayerGroups",
  props: ['player'],
  data: () => ({
    playerGroups: [],
    panel: true,
    
  }),
      computed: {
  user(){
    return this.$store.state.user
  }
        
  },

  mounted (){
    this.getPlayerGroupsbyPlayer();

  },

  methods: {

    async getPlayerGroupsbyPlayer() {
      console.log(' starting getPlayerGroups')
      await EventService.getPlayerGroupsbyPlayer(this.player.userID)
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