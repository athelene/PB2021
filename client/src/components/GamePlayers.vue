
<template>
<div>

<div v-if="playerGroups.includes(gameGroup)">
      <v-switch ml-2
      v-if="switch1 === true"
      @click="changePlayerStatus()"
      v-model="switch1"
      label="Playing"
    ></v-switch>
      <v-switch v-if="switch1 !== true"
      @click="changePlayerStatus()"
      v-model="switch1"
      label="Not Playing"
    ></v-switch>
</div>
    <v-expansion-panels
      v-model="panel"
    >
      <v-expansion-panel>
        <v-expansion-panel-header>{{GamePlayers.length}} Players</v-expansion-panel-header>
        <v-expansion-panel-content>
            <ul class="listStyle">
            <li v-for="player in GamePlayers" :key="player.UserDisplayName">
                {{player.UserDisplayName}} - ({{player.userPhoneAreaCode}}) {{player.userPhonePrefix}}-{{player.userPhoneLine}}
            </li>
            </ul>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

     <v-row class="mt-2" >
    <v-dialog
      v-model="noteDialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          icon
          small
        >
        <v-icon>mdi-message-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add a Note</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
            <v-textarea
                filled
                name="gameNote"
                v-model="gameNote"
                label="Enter your note"
        ></v-textarea>
              </v-col>

            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary darken-1"
            text
            @click="cancelNote()"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary darken-1"
            text
            @click="addNote()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-spacer></v-spacer>
        <v-btn v-if="gameCreator === user.UserID || user.userAdmin === 1"
    small icon color="primary" class="pr-8"
    @click="editGame(gameID)"
    ><v-icon>mdi-pencil</v-icon>
</v-btn>
    <v-btn v-if="gameCreator === user.UserID || user.userAdmin === 1"
    small icon color="primary" @click="deleteGame(gameID)"><v-icon>mdi-trash-can</v-icon></v-btn>
 </v-row>

    <div v-for="note in gameNotes" :key="note.GameNoteID" class="mb-1 mt-2">
        <strong>{{note.UserDisplayName}}: </strong> {{note.NoteText}}
        <v-btn v-if="note.GamePlayerID === user.UserID" icon small @click="deleteGameNote(note.GameNoteID)">
            <v-icon>mdi-close-circle</v-icon></v-btn>
    </div>

  </div>
</template>


<script>
import EventService from '../Services/EventServices'

export default {
  name: "GamePlayers",
  props: ['gameID', 'gameGroup', 'gameCreator'],
  data: () => ({
    playerStatus: false,
    GamePlayers: [],
    switch1: false,
    panel: true,
    noteDialog: false,
    gameNote: '',
    gameNotes: [],
    playerGroups: [],
  }),
      computed: {
  user(){
    return this.$store.state.user
  }
        
  },

  mounted (){
    this.getGamePlayers();
    this.getPlayerStatus();
    this.getGameNotes();
    this.getPlayerGroups();

  },

  methods: {

    async getGamePlayers() {
      console.log(' starting getGamePlayers')
      await EventService.getGamePlayers(this.gameID)
      .then(
        (gamePlayers => {
          this.GamePlayers = gamePlayers
            console.log('gamePlayers : ', gamePlayers, this.players)
        })
      );
    },

    async getPlayerGroups() {
      console.log(' starting getPlayerGroups')
      await EventService.getPlayerGroups(this.user.UserID)
      .then(
        (playerGroups => {
          Object.keys(playerGroups).forEach(key => {
          this.playerGroups.push(playerGroups[key].GroupName)
            console.log(key, playerGroups[key]);
          });
            console.log('playerGroups are: ', playerGroups, this.playerGroups)
        })

      );
    },

    async cancelNote() {
        this.gameNote = '';
        this.noteDialog = false;
    },

  async editGame(gameID) {
    this.$router.push({ path: 'editGame', query: { ID: gameID } })
  },

    async getPlayerStatus() {
      console.log('starting getPlayerStatus')
      await EventService.getPlayerStatus(this.gameID, this.user.UserID)
      .then(
        (playerStatus => {
          this.playerStatus = playerStatus
          console.log('result of playerStatus in gamePlayers.vue is: ', playerStatus)
          if(playerStatus === 1) {
              this.switch1 = true
              console.log('the switch should be on', this.switch1)
          } else {
              this.switch1 = false
              console.log('the switch should be off')
          }
            console.log('playerStatus : ', playerStatus, this.playerStatus)
        })
      );
    },

    async changePlayerStatus() {
      console.log(' starting changePlayerStatus')
      this.playerStatus = !this.playerStatus
      await EventService.changePlayerStatus(this.gameID, this.user.UserID, this.playerStatus)
      .then(
        (playerStatus => {
          this.getGamePlayers()
        })
      );
    },

   async changePlayerStatus() {
      console.log(' starting changePlayerStatus')
      this.playerStatus = !this.playerStatus
      await EventService.changePlayerStatus(this.gameID, this.user.UserID, this.playerStatus)
      .then(
        (playerStatus => {
          this.getGamePlayers()
        })
      );
    },

    async addNote() {
    this.noteDialog = false
      console.log(' starting addNote')
      await EventService.addNote(this.gameID, this.user.UserID, this.gameNote)
      .then(
        (gameNoteReturn => {
          this.getGameNotes()
        })
      );
    },

    async deleteGameNote(gameNoteID) {
      console.log(' starting deleteGameNote')
      await EventService.deleteGameNote(gameNoteID)
      .then(
        (gameNoteReturn => {
          this.getGameNotes()
        })
      );
    },

    async getGameNotes() {
      console.log(' starting getGameNotes')
      await EventService.getGameNotes(this.gameID)
      .then(
        (gameNotes => {
            console.log('gameNotes back from ES is: ', gameNotes)
          this.gameNotes = gameNotes
        })
      );
    },

    async deleteGame(gameID) {

   if(confirm("Do you really want to delete this game?")){

      await EventService.deleteGame(this.gameID)
      .then(
        (gameDelete => {
            console.log('gameDelete back from ES is: ', gameDelete)
            this.$emit('update-games')
            console.log('emit event here to parent')
        })
      )
      .catch(error => {
          console.log(error);
      })
   }
},


  }

};
</script>
<style scoped>
.gameBackground {
  background-color: peachpuff;;
}

.listStyle {
   list-style-type: none;
}
</style>
