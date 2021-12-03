<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h2 class="font-weight-bold blue--text">
        Sign In
      </h2>
    </v-card-title>

    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="blue"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card
          color="blue"
          flat
        >
<!--- Start Login form --->
{{user.UserDisplayName}}
          <v-card-text v-if="item === 'Login'">
<h2> {{message}}</h2>
<v-form v-model="valid" >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
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
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn  class="orange" @click="login()"><v-icon>mdi-check</v-icon></v-btn>
    </v-container>
  </v-form>
            
            </v-card-text>
<!--- Start registration form --->
          <v-card-text v-if="item === 'Sign Up'">

<v-form v-model="valid" >
    <v-container>
      <v-row>
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
          ></v-text-field>
        </v-col>
        <v-col
          cols="4"
          md="4"
        >
        Phone <br />

          <v-text-field
            v-model="phone"
            :rules="phoneRules"
            label="Phone"
            v-mask="'(###) ###-####'"
            required
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
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn  class="orange" @click="register()"><v-icon>mdi-check</v-icon></v-btn>
    </v-container>
  </v-form>
          </v-card-text>

        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import EventService from '../Services/EventServices'
  export default {
    name: "Login",
    data () {
      return {
        tab: 'login',
        items: [
          'Login', 'Sign Up'
        ],
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
      phoneAreaCodeRules: [
        v => !!v || 'Area code is required',
        v => v.length = 3 || 'Area code must be 3 characters',
      ],
      phonePrefixRules: [
        v => !!v || 'Phone prefix is required',
        v => v.length = 3 || 'Prefix must be 3 characters',
      ],
      phoneLineRules: [
        v => !!v || 'Phone line is required',
        v => v.length = 4 || 'Phone line must be 4 characters',
      ],
      displayname: '',
      userInfo: [],

      password: '',
      password2: '',
      show1: false,
      message: '',

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
    computed: {
  user(){
    return this.$store.state.user
  }
        
  },

  
  methods: {
    async register() {
      console.log('inlogin.vue, starting register ')
      console.log('fields: ', this.email, this.firstname, this.lastname, this.displayname, this.password)
      await EventService.registration(this.email, this.firstname, this.lastname, this.displayname, this.password)
      .then(
        (registerReturn => {
            console.log('registered', registerReturn)
        })

      );
    },
    async login() {
      console.log('in login.vue, starting login ')
      console.log('fields: ', this.email, this.password, 'going to run EventService.login')
      await (EventService.login(this.email, this.password))
      .then(
         (userInfo ) => {
          console.log('userInfo sent back after eventservice.login: ', userInfo)
          if (userInfo === false || userInfo === undefined || userInfo === 'Invalid Login') {
              this.message="Invalid login"
              this.tab = 0;
              this.loggedin = false
              console.log('message is: ', this.message, 'userInfo is: ', userInfo)
              return
          } else {

          this.$store.dispatch('login', userInfo);
          this.$set(this, "userInfo", userInfo);
            console.log('this is what user is after call to event', this.userInfo)
            this.loggedin = true
            }

        })
      .then(() => {
          if(this.loggedin === true) {
              console.log('post dispatch this.$store.user is: ', this.$store.state.user)
              console.log('and the computed value of user is: ', this.user)
              this.$router.push('Main') }
          console.log('message is: ', this.message)
      })   
    },

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