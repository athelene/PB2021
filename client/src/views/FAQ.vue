<template>
  <div class="text-center" >
    <h1 class="ml-5 headingColor">Frequently Asked Questions</h1>
<v-dialog
      v-model="dialogFaq"
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
          Add FAQ
        </v-btn>
      </template>
      <v-card>
        <v-card-subtitle>
          <span class="text-h5">Add A Question/Answer</span>
        </v-card-subtitle>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="newFaqQuestion"
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
         v-model="newFaqAnswer"
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
            @click="addFaq()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

        <v-card 
            class="mx-auto mb-5 mt-3 ml-3 mr-3 cardBackground"
            max-width="80em"
            elevation="2"
         v-for="faq in faqs" :key="faq.faqID">
            <v-card-title>
            {{faq.FaqQuestion}}
            </v-card-title>
            <v-card-text class="text-left">
             {{faq.FaqAnswer}}
            </v-card-text>
        <v-row v-if="user.user.userAdmin === 1" class="mt-4 mr-4 ml-4">
    <v-btn icon small @click="editFaq(faq.faqID)"><v-icon>mdi-pencil</v-icon></v-btn>
    <v-spacer></v-spacer>
    <v-btn icon small @click="deleteFaq(faq.faqID)" ><v-icon>mdi-trash-can-outline</v-icon></v-btn>
        </v-row>
    </v-card>
  </div>
</template>

<script>
import EventService from '../Services/EventServices'

export default {
    name: "FAQ",

    data: function() {
    return {
      faqs: [],
      navTitle: 'FAQ',
      dialogFaq: false, 
      newFaqQuestion: '',   
      newFaqAnswer: '', 
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
    this.getFaqs();

},
methods: {

    async getFaqs() {
      await EventService.getFaqs()
      .then(
        (faqReturn => {
          this.faqs= faqReturn
        })
      );
    },

    async deleteFaq(faqID) {
      await EventService.deleteFaq(faqID)
      .then(
        (() => {
          this.getFaqs();
        })
      );
    },

    async addFaq() {

      await EventService.addFaq(this.newFaqQuestion, this.newFaqAnswer)
      .then((faqReturn) => {
        this.faqs = faqReturn
        this.newFaqQuestion = '';
      this.newFaqAnswer = '';
      this.dialogFaq = false;
      this.getFaqs();
      })
    },

    closeFaqDialog() {
      this.newFaqQuestion = '';
      this.newFaqAnswer = '';
      this.dialogFaq = false;
    },

  async editFaq(faqID) {
    this.$router.push({ path: 'editFaq', query: { ID: faqID } })
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
