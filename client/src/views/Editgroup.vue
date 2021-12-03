<template class="appBackground">
  <div >

        <v-card class="Selected">
    <v-form class="Selected mt-3" >
              <v-card>
        <v-card-title>
          <span class="text-h5">Edit Group</span>
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
                v-model="groupName"
                  label="Group Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                v-model="groupDescription"
                  label="Group Description"
                  required
                ></v-text-field>
              </v-col>
              <v-col 
                cols="12"
                sm="6"
                md="4"
              >

              <v-select
                ref="groupType"
                :items="groupTypes"
                v-model="groupType"
                item-text="GroupType"
                item-value="GroupTypeID"
                label="Group Type"

                class="selectStyle ml-5"
              ></v-select>

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
            @click="editGroup()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
</v-form>
    </v-card>
    <v-card>
      <v-card-title>
        Manage Group Players
      </v-card-title>
      <v-card-text class="ml-5">
        <div v-for="player in groupPlayers" :key="player.UserID" >
            <v-checkbox
            @click="changeStatus(player.GroupStatus, player.UserID)"
              v-model="player.GroupStatus"
              :label= "player.UserDisplayName"
              color="blue"
            ></v-checkbox>

        </div>
      </v-card-text>
    </v-card>

  </div>
</template>

<script>
import EventService from '../Services/EventServices'

export default {
    name: "Editgroup",
    data: function() {
    return {
      group: [],
      groupName: '',
      groupType: '',
      groupDescription: '',
      groupTypes: [],
      groupPlayers: [],

    }
  },
computed: {
  user(){
    return this.$store.state.user
  },
      
  },

mounted() {
    this.groupID = this.$route.query.ID;
    this.getGroupTypes();
    this.getGroup();
},
methods: {

    async getGroupTypes() {
      await EventService.getGroupTypes()
      .then(
        (groupTypes => {
          this.groupTypes = groupTypes
            console.log('this.groupTypes is: ', this.groupTypes)
        })
      );
    },

    async getGroup() {
      await EventService.getGroup(this.groupID)
      .then(
        (groupReturn => {
          this.groupName = groupReturn[0].GroupName;
          this.groupType = groupReturn[0].GroupType;
          this.groupDescription = groupReturn[0].GroupDescription;
            console.log('after groupReturn: ', this.groupName, this.groupTypeID, this.groupDescription)
          this.getPlayerGroupStatus();
        })
      )
    },

    async editGroup() {
      await EventService.editGroup(this.groupID, this.groupName, this.groupType, this.groupDescription)
      .then(
        (() => {
          this.$router.push({ path: 'Groups' })
        })
      );
    },

    async getPlayerGroupStatus() {
      await EventService.getPlayerGroupStatus(this.groupID)
      .then(
        ((playerList) => {
          this.groupPlayers = playerList
        })
      );
    },

    async changeStatus(playerStatus, userID) {
      console.log('starting changeStatus, playerStatus, userID', playerStatus, userID)
      if(playerStatus === true) {
        console.log('going to run addToGroup')
      await EventService.addToGroup(this.groupID, userID)
      .then(
        (() => {
          this.getPlayerGroupStatus();
        })
      )
      } else {
        console.log('running removeFromGroup, playerStatus is: ', playerStatus)
      await EventService.removeFromGroup(this.groupID, userID)
      .then(
        (() => {
          this.getPlayerGroupStatus();
        })
      );  
      }
    },

    async cancelEdit() {
        this.$router.push({ path: 'Groups' })
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
