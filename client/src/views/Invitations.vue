<template>
  <div class="text-center" >
    <h1 class="ml-5 headingColor">App Invitations Sent</h1>
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
<v-row class="justify-center mt-3">
        <v-card 
            class="cardBackground mx-auto mb-5 mt-3 ml-3 mr-3"  width="23em"
            elevation="2"
         v-for="player in players" :key="player.PlayerID">
            <v-card-text>
            {{player.InvitationEmail}}<br />
            <v-spacer></v-spacer>
   <v-btn icon small @click="deleteInvitation(player.InvitationID)" v-if="user.user.userAdmin === 1"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
            </v-card-text>

    </v-card>
    </v-row>
  </div>
</template>

<script>
import EventService from '../Services/EventServices'

export default {
    name: "Invitations",
      components: {
  },

    data: function() {
    return {
      players: [],
      navTitle: 'Invitations',
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

},
mounted() {
  if(!this.user || this.user.length === 0) {
     this.$router.push('/')
   }
    this.getInvitations();
},
methods: {

    async getInvitations() {
      await EventService.getInvitations()
      .then(
        (playersReturn => {
          this.players= playersReturn
        })
      );
    },

    async deleteInvitation(invitationID) {
      await EventService.deleteInvitation(invitationID)
      .then(
        (() => {
          this.getInvitations();
        })
      );
    },

    async invitePlayer() {

      await EventService.invitePlayer(this.invitePlayerEmail, this.user.user.UserID)
      .then((dupCheck) => {
        if(dupCheck === 'duplicate') {
          this.invitationStatus = "Duplicate email."
        } else 
        { this.invitationStatus = "Invitation sent"}
        this.getInvitations();
        this.dialogInvitation = false;
      })
    },

    closeInvitationDialog() {
      this.invitationStatus = '';
      this.invitePlayerEmail = '';
      this.dialogInvitation = false;
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
