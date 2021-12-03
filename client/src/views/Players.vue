<template>
  <div class="text-center" >
    <h1 class="ml-5 headingColor">Players</h1>
<v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn small color="primary" class="ml-4 mb-3"
          dark
          v-bind="attrs"
          v-on="on"
          v-if="user.userAdmin === 1"
        >
          New Player
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">New Player</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                v-model="playerName"
                  label="Player Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                v-model="playerEmail"
                  label="Player Email"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="newPlayer()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

        <v-card 
            class="mx-auto mb-5 mt-3 cardBackground"
            max-width="344"
            elevation="2"
         v-for="player in players" :key="player.PlayerID">
            <v-card-title>
            {{player.userLast}}, {{player.userFirst}} <br />
 
            </v-card-title>
            <v-card-text>
           {{player.userEmail}} <br />
            ( {{player.userPhoneAreaCode}} ) {{player.userPhonePrefix}}-{{player.userPhoneLine}}
            </v-card-text>
        <PlayerGroups :player="player" />
        <v-row v-if="user.userAdmin === 1 || user.UserID === player.userID" class="mt-4 mr-4 ml-4">
    <v-btn icon small @click="editPlayer(player.userID)"><v-icon>mdi-pencil</v-icon></v-btn>
    <v-spacer></v-spacer>
    <v-btn icon small @click="deletePlayer(player.userID)" v-if="user.userAdmin === 1"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
        </v-row>
    </v-card>
  </div>
</template>

<script>
import EventService from '../Services/EventServices'
import PlayerGroups from '../components/PlayerGroups.vue'

export default {
    name: "Players",
      components: {
        PlayerGroups
  },

    data: function() {
    return {
      players: [],
      switch1: false,
      navTitle: 'Players',
      dialog: false,
      groupTypes: [],
      groupTypeID: ' ',
      playerName: '',
      playerEmail: ''      
    }
  },
computed: {
  user(){
    return this.$store.state.user
  },
      
  },
created() {

    console.log('created Players.vue: ')

},
mounted() {
    this.getPlayers();
    console.log('should have run getPlayers')
},
methods: {

    async getPlayers() {
        console.log('starting getPlayers in vue file')
      await EventService.getPlayers()
      .then(
        (playersReturn => {
          this.players= playersReturn
            console.log('this.players is: ', this.players)
        })
      );
    },

    async deletePlayer(playerID) {
      await EventService.deletePlayer(playerID)
      .then(
        (() => {
          this.getPlayers();
        })
      );
    },

    async newPlayer() {
      await EventService.newPlayer(this.playerName, this.playerEmail)
      .then(
        (() => {
          this.playerName ='';
          this.playerID = '';
          this.playerEmail = '';
          this.playerPhone = '';
          this.dialog = false;
          this.getPlayers();
        })
      );
    },

  async editPlayer(playerID) {
    this.$router.push({ path: 'editPlayer', query: { ID: playerID } })
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
