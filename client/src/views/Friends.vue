<template>
  <div class="text-center" >
    <h1 class="ml-5 headingColor">Diva Friends</h1>
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
          Add a Diva Friend
        </v-btn>
      </template>
      <v-card>
        <v-card-subtitle>
          <span class="text-h5">Add a non-Diva to the Friends List</span>
          <p class="pl-5">This is for people who are not members of the Divas but might want to play with us from time to time
               when we are short on players. <br> <br> <span class="warning--text">PLEASE MAKE SURE YOU GET THEIR APPROVAL BEFORE YOU ADD THEM TO THE LIST.</span>
          </p>
        </v-card-subtitle>
        <p v-if="invitationStatus"> {{invitationStatus}} </p>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="friendName"
                  label="Full Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="friendEmail"
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
            @click="addFriend()"
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
         v-for="friend in friends" :key="friend.FriendID">


        <v-row  class="mt-4 mr-4 ml-4 pt-3 pb-3">

            {{friend.FriendName}}  <span v-if="user.user.userAdmin === 1"> ( {{friend.FriendEmail}} )</span>

    <v-btn icon small @click="deleteFriend(friend.FriendID)" v-if="user.user.userAdmin === 1"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
        </v-row>
    </v-card>
  </div>
</template>

<script>
import EventService from '../Services/EventServices'

export default {
    name: "Friends",

    data: function() {
    return {
      friends: [],
      switch1: false,
      navTitle: 'Friends',
      dialog: false,
      friendName: '',
      friendEmail: '' ,
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

mounted() {
  if(!this.user || this.user.length === 0) {
     this.$router.push('/')
   }
    this.getFriends();
},
methods: {

    async getFriends() {
      await EventService.getFriends()
      .then(
        (friendsReturn => {
          this.friends= friendsReturn
        })
      );
    },

    async deleteFriend(friendID) {
      await EventService.deleteFriend(friendID)
      .then(
        (() => {
          this.getFriends();
        })
      );
    },

    async addFriend() {
        this.invitationStatus = '';
        var isDup = false;
        for (let i = 0; i < this.friends.length; i++) {
            if (this.friends[i].FriendEmail.toUpperCase() === this.friendEmail.toUpperCase()) {
           isDup =  true;
          }
        }
            if (isDup === true ) {
                this.invitationStatus = 'ATTENTION: ' + this.friendName + ' is already on the friend list.';
                this.friendName = '';
                this.friendEmail = '';
                return
                } else
            {
//                this.invitationStatus = 'Friend Added'
                EventService.addFriend(this.friendEmail, this.friendName, this.user.user.UserID)
                .then(() => {
                    this.dialogInvitation = false;
                    this.friendName = '';
                    this.friendEmail = '';
                    this.getFriends()
                })}

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
