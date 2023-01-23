<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h2 class="font-weight-bold blue--text">
        Sign Up
      </h2>
    </v-card-title>

        <v-card
        color="basil"
          flat
        >

<!--- Start registration form --->
          <v-card-text >

<v-form v-model="valid" >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="invitationCode"
            label="Invitation Code"
            tabindex="1"
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="firstname"
            :rules="firstRules"
            :counter="15"
            label="First name"
            required
            tabindex="2"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="lastname"
            :rules="lastRules"
            :counter="15"
            label="Last name"
            required
            tabindex="3"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="displayname"
            :rules="displayRules"
            :counter="40"
            label="Name you want others to see"
            required
            tabindex="4"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
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
            v-model="phone"
            hint="Numbers Only!"
            required
            tabindex="6"
          ></v-text-field>
          </v-col>


        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
           v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="passowrd"
            label="Password"
            hint="At least 8 characters"
            class="input-group--focused"
            @click:append="show1 = !show1"
            tabindex="7"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
           v-model="password2"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="password2"
            label="Re-enter your password"
            hint="At least 8 characters"
            class="input-group--focused"
            @click:append="show1 = !show1"
            tabindex="8"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn  tabindex="9"
      class="orange" @click="register()"><v-icon>mdi-check</v-icon></v-btn>
    </v-container>
  </v-form>
          </v-card-text>

        </v-card>
  </v-card>
</template>

<script>
import EventService from '../Services/EventServices'
  export default {
    name: "Registration",
    data () {
      return {
     valid: false,
      firstname: '',
      lastname: '',
      phone: '',
      firstRules: [
        v => !!v || 'First name is required',
        v => v.length <= 10 || 'Name must be less than 15 characters',
      ], 
      lastRules: [
        v => !!v || 'Last name is required',
        v => v.length <= 10 || 'Name must be less than 15 characters',
      ],      
      displayRules: [
        v => !!v || 'Display name is required',
        v => v.length <= 40 || 'Name must be less than 40 characters',
      ],
      phoneRules: [
        v => !!v || 'Phone number is required',
        v => v.length <= 40 || 'Name must be less than 40 characters',
      ],
      displayname: '',
      userInfo: [],

      password: '',
      password2: '',
      show1: false,
      message: '',
      invitationCode: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => (`The email and password you entered don't match`),
    },
      }
    },

    mounted (){
   console.log('running registration.vue')

  },

  methods: {
    async register() {
      var areaCode = this.phone.substr(0, 3)
      var prefixCode = this.phone.substr(3,3)
      var phoneLine = this.phone.substr(6,4)
      await EventService.registration(this.email, this.firstname, this.lastname, this.displayname, this.password, areaCode, prefixCode, phoneLine, this.invitationCode)
      .then(
        (registerReturn => {
          if (registerReturn === 'invalid') {
            this.regError = "Invalid Invitation Code with this Email Address."
          } else {
            this.$router.push("/")
          }
            
        })

      );
    }
  }
  }
</script>

<style>
/* Helper classes */
.basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>