<template>
  <v-form ref="form" v-model="valid" lazy-validation style="max-height: 100vh; overflow: hidden;">
    <v-container>
      <v-row style="height: 90vh;" align="center">
        <v-col cols="12" md="4">
          <v-row style="color: whitesmoke;" class="mb-16">
            <h1 style="font-size: 3.5rem;">
              Welcome back!
            </h1>
            <h3 style="font-weight: normal;">
              Please log in to your account
            </h3>
          </v-row>
          <v-row>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              filled
              required
              background-color="white"
              rounded
            />
          </v-row>
          <v-row>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              filled
              required
              background-color="white"
              rounded
            />
          </v-row>
          <v-row>
            <app-button
              :disabled="!valid"
              label="Login"
              :is-block="true"
              button-class="mt-10"
              color="accent"
              @click="login"
            />
          </v-row>
        </v-col>
        <v-col cols="12" md="4" />
        <v-col cols="12" md="4">
          <v-img src="abacus.png" />
        </v-col>
      </v-row>
    </v-container>
    <!--    <alert v-if="displayLoginErrMsg" :message="loginErrorMessage" :type="ALERT_TYPES.ERROR" :display="displayLoginErrMsg" />-->
    <v-alert
      v-model="displayLoginErrMsg"
      dismissible
      :type="ALERT_TYPES.ERROR"
      dense
      transition="scale-transition"
    >
      {{ loginErrorMessage }}
    </v-alert>
  </v-form>
</template>

<script>
import AppButton from '../components/common/AppButton'
import { ALERT_TYPES } from '../common/commonHelper'

export default {
  name: 'IndexPage',
  components: {
    AppButton
  },
  layout: 'login',
  data: () => ({
    valid: false,
    email: '',
    password: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    loginErrorMessage: 'Wrong credentials. Please try again.',
    displayLoginErrMsg: false,
    ALERT_TYPES
  }),
  methods: {
    async login () {
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
      } catch (error) {
        this.displayLoginErrMsg = true
      }
    }
  }
}
</script>
