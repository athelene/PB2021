<template class="appBackground">
  <div v-if="user.userID > 0" >

      <v-card>
        <v-card-subtitle>
          <span class="text-h5">Edit A Question/Answer</span>
        </v-card-subtitle>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="faqQuestion"
                  label="FAQ Question"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="12"
              >
        <v-textarea
         v-model="faqAnswer"
          label="FAQ Answer"
          required
        ></v-textarea>

              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="closeFaqDialog()"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="editFaq()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>

  </div>
</template>

<script>
import EventService from '../Services/EventServices'

export default {
    name: "Editfaq",
    data: function() {
    return {
      faqID: [],
      faq: [],
      faqQuestion: '',
      faqAnswer: '',
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
    this.faqID = this.$route.query.ID;
    this.getFaq();
},
methods: {

    async getFaq() {
      await EventService.getFaq(this.faqID)
      .then(
        (faqReturn) => {
          this.faqQuestion = faqReturn[0].FaqQuestion;
          this.faqAnswer = faqReturn[0].FaqAnswer;
        })
    },

    async editFaq() {
      await EventService.editFaq(this.faqID, this.faqQuestion, this.faqAnswer)
      .then(
        (() => {
        this.$router.push({ path: 'Faq' })
        })
      );
    },


    async cancelEdit() {
        this.$router.push({ path: 'Faq' })
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
