<template>
  <div class="text-center" >
    <h1 class="ml-5 headingColor">Groups</h1>
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
          New Group
        </v-btn>
      </template>
      <v-card > 
        <v-card-title>
          <span class="text-h5">New Group</span>
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
                v-model="groupTypeID"
                item-text="GroupType"
                item-value="GroupTypeID"
                label="Group Type"
                solo
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
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="newGroup()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

        <v-card     class="mx-auto mb-5 mt-3 cardBackground"
          max-width="344"
          elevation="2"
          v-for="group in groups" :key="group.GroupID">
            <v-card-title>
            {{group.GroupName}} 
            </v-card-title>
            <v-card-text>
            {{group.GroupDescription}}
            </v-card-text>
        <GroupPlayers :group="group" />
        <v-row v-if="user.userAdmin === 1" class="mt-4 mr-4 ml-4">
    <v-btn icon small @click="editGroup(group.GroupID)"><v-icon>mdi-pencil</v-icon></v-btn>
    <v-spacer></v-spacer>
    <v-btn icon small @click="deleteGroup(group.GroupID)"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
        </v-row>
    </v-card>
  </div>
</template>

<script>
import EventService from '../Services/EventServices'
import GroupPlayers from '../components/GroupPlayers.vue'

export default {
    name: "Groups",
      components: {
        GroupPlayers
  },

    data: function() {
    return {
      groups: [],
      switch1: false,
      navTitle: 'Groups',
      dialog: false,
      groupTypes: [],
      groupTypeID: ' ',
      groupName: '',
      groupDescription: ''
      
    }
  },
computed: {
  user(){
    return this.$store.state.user
  },
      
  },
created() {

    console.log('created Groups.vue: ')

},
mounted() {
    this.getAllGroups();
    this.getGroupTypes();

    
},
methods: {

    async getAllGroups() {
      await EventService.getAllGroups()
      .then(
        (groupReturn => {
          this.groups = groupReturn
            console.log('this.groups is: ', this.groups)
        })
      );
    },

    async getGroupTypes() {
      await EventService.getGroupTypes()
      .then(
        (groupTypes => {
          this.groupTypes = groupTypes
            console.log('this.groupTypes is: ', this.groupTypes)
        })
      );
    },

    async deleteGroup(groupID) {
      await EventService.deleteGroup(groupID)
      .then(
        (() => {
          this.getAllGroups();
        })
      );
    },

    async newGroup() {
      console.log('groupDescription to es is: ', this.groupDescription)
      await EventService.newGroup(this.groupName, this.groupTypeID, this.groupDescription)
      .then(
        (() => {
          this.groupName ='';
          this.groupTypeID = '';
          this.groupDescription = '';
          this.dialog = false;
          this.getAllGroups();
            console.log('this.groups is: ', this.groups)
        })
      );
    },

  async editGroup(groupID) {
    this.$router.push({ path: 'editGroup', query: { ID: groupID } })
  },

    }
}

</script>
<style scoped>
.appBackground {
  background: url(../assets/pickleball.jpg) no-repeat center center fixed; 
  background-size:100% 100%;
  height: 100%;
}

.cardBackground {
  background-color: #f6fabb;
}

.headingColor {
  color: #f6fabb;
}

.Selected {
  background-color: lightyellow;
}

</style>
