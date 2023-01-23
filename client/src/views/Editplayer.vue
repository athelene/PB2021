<template class="appBackground">
  <div v-if="user.userID > 0" >

        <v-card class="Selected">
    <v-form class="Selected mt-3" >
              <v-card>
        <v-card-title>
          <span class="text-h5">Edit Player</span>
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
                v-model="firstName"
                  label="First Name"
                  required
                  tabindex="1"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                v-model="lastName"
                  label="Last Name"
                  required
                  tabindex="2"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                v-model="displayName"
                  label="How you want your name displayed"
                  required
                  tabindex="3"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                v-model="email"
                  label="Email"
                  required
                  tabindex="5"
                ></v-text-field>
              </v-col>
        <v-col
          cols="6"
          md="6"
        >
        Phone <br />

          <v-text-field
            v-model="userPhone"
            hint="Numbers Only!"
            required
            tabindex="6"
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
            @click="cancelEdit()"
          >
            Cancel
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="editPlayer()"
            tabindex="7"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
</v-form>
    </v-card>

  </div>
</template>

<script>
import EventService from '../Services/EventServices'

export default {
    name: "Editplayer",
    data: function() {
    return {
      playerID: [],
      firstName: '',
      lastName: '',
      displayName: '',
      email: [],
      phone: [],
      userPhone: '',

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
    this.playerID = this.$route.query.ID;
    this.getPlayer();
},
methods: {

    async getPlayer() {
      await EventService.getPlayer(this.playerID)
      .then(
        (playerReturn) => {
          this.firstName = playerReturn[0].userFirst;
          this.lastName = playerReturn[0].userLast;
          this.displayName = playerReturn[0].userDisplayName;
          this.email = playerReturn[0].userEmail;
          this.userPhone = playerReturn[0].userPhone;
        })
    },

    async editPlayer() {
      var areaCode = this.userPhone.substr(0, 3)
      var prefixCode = this.userPhone.substr(3,3)
      var phoneLine = this.userPhone.substr(6,4)
      await EventService.editPlayer(this.playerID, this.firstName, this.lastName, this.displayName, this.email, areaCode, prefixCode, phoneLine)
      .then(
        (() => {
        this.$router.push({ path: 'Players' })
        })
      );
    },


    async cancelEdit() {
        this.$router.push({ path: 'players' })
    }

    }
}

</script>
<style scoped>
.appBackground {
  background: url(../assets/pickleball.jpg) no-repeat center center fixed; 
}

.gameDate {
  max-width: 80%;
}
.grid {
   display: grid;
  justify-content: center;
  /* define the number of grid columns */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr) );
}


.Selected {
  background-color: rgb(255, 255, 224);
}

.selectStyle {
  max-width: 80%;
  margin-left: 1em;
}

.scheduledGames {
  max-width: 80%;
}
</style>
