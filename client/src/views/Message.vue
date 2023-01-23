<template>
  <div class="text-center" >

      <v-card>
        <v-card-subtitle>
          <span class="text-h5">Send A Message to Everyone</span>
        </v-card-subtitle>
        <v-card-text>
          <v-container>
            <p v-if="msgStatus">{{msgStatus}}</p>
            <v-row>
              <v-col
                cols="12"

              >
        <v-textarea
        v-model="newMsgText"
          outlined
          name="newMsgText"
          label="Your message"
        ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>

          <v-btn
            color="blue darken-1"
            text
            @click="sendMessage()"
          >
            Send
          </v-btn>
        </v-card-actions>
      </v-card>
<h2 class="white mt-3">Messages from the last 30 days</h2>
        <v-card 
            class="mx-auto mb-5 mt-3 cardBackground"
            max-width="344"
            elevation="2"
         v-for="message in messages" :key="message.messageID">
            <v-card-title>
           {{message.messageDate}} <br /> from {{message.userDisplayName}} 
            </v-card-title>
            <v-card-text>
                <h3> {{message.messageText}}</h3>
           <a :href="'mailto:' + message.userEmail"> {{message.userEmail}} </a> <br />
           <a :href="'tel:' + message.userPhone">{{message.userPhone}}</a>
            </v-card-text>
        <v-row v-if="user.user.userAdmin === 1 || user.user.UserID === player.userID" class="mt-4 mr-4 ml-4">
    <v-spacer></v-spacer>
        </v-row>
    </v-card>
  </div>
</template>

<script>
import EventService from '../Services/EventServices'

export default {
    name: "Message",

    data: function() {
    return {
        messages: [],
        newMsgText: '',
        msgStatus: '',
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
    this.getMessages();
},

methods: {

    async getMessages() {
      await EventService.getMessages()
      .then(
        (messagesReturn => {
            this.messages = messagesReturn;
        })
      );
    },
    async sendMessage() {
      await EventService.sendMessage(this.user.user.UserID, this.newMsgText)
      .then(    
        (() => {
            this.getMessages();
            this.msgStatus="Message Sent"
            this.newMsgText = '';
            this.$router.push({ path: 'Main' })
        })
      );
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
