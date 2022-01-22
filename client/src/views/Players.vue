<template>
  <div class="text-center" >
    <h1 class="ml-5 headingColor">Players</h1>
<v-dialog
      v-model="dialogInvitation"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          v-if="user.user.userAdmin === 1"
        >
          Send Invitation
        </v-btn>
      </template>
      <v-card>
        <v-card-subtitle>
          <span class="text-h5">Send Invitation</span>
        </v-card-subtitle>
        <v-card-text>
          <v-container>
            <p v-if="invitationStatus">{{invitationStatus}}</p>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="invitePlayerEmail"
                  label="Email Address"
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
            @click="closeInvitationDialog()"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="invitePlayer()"
          >
            Send
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
           <a :href="'mailto:' + player.userEmail"> {{player.userEmail}} </a> <br />
           <a :href="'tel:' + player.userPhone">{{player.userPhone}}</a>
           
            </v-card-text>
        <v-row v-if="user.user.userAdmin === 1 || user.user.UserID === player.userID" class="mt-4 mr-4 ml-4">
    <v-btn icon small @click="editPlayer(player.userID)"><v-icon>mdi-pencil</v-icon></v-btn>
    <v-spacer></v-spacer>
    <v-btn icon small @click="deletePlayer(player.userID)" v-if="user.userAdmin === 1"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
        </v-row>
    </v-card>
  </div>
</template>

<script>
import EventService from '../Services/EventServices'

export default {
    name: "Players",

    data: function() {
    return {
      players: [],
      switch1: false,
      navTitle: 'Players',
      dialog: false,
      groupTypes: [],
      groupTypeID: ' ',
      playerName: '',
      playerEmail: '' ,
      dialogInvitation: false, 
      invitePlayerEmail: '',   
      invitationStatus: '', 
    }
  },
computed: {
  user(){
    return this.$store.state.user
  },
      
  },
created() {

//    console.log('created Players.vue: ')

},
mounted() {
    this.getPlayers();
//    console.log('should have run getPlayers')
//    console.log('user is: ', this.user)
},
methods: {

    async getPlayers() {
//        console.log('starting getPlayers in vue file')
      await EventService.getPlayers()
      .then(
        (playersReturn => {
          this.players= playersReturn
//            console.log('this.players is: ', this.players)
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

    async invitePlayer() {

//      console.log('in Players.vue invitePlayerEmail is: ', this.invitePlayerEmail)
      await EventService.invitePlayer(this.invitePlayerEmail, this.user.user.UserID)
      .then((dupCheck) => {
        if(dupCheck === 'duplicate') {
          this.invitationStatus = "Duplicate email."
        } else 
        { this.invitationStatus = "Invitation sent"}
      })
    },

    closeInvitationDialog() {
      this.invitationStatus = '';
      this.invitePlayerEmail = '';
      this.dialogInvitation = false;
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
