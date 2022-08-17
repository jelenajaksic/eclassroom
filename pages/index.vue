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
              {{ showForgotPassword ? 'Enter your email to reset your password' : 'Please log in to your account' }}
            </h3>
          </v-row>
          <v-row>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              type="text"
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
            <p role="button" class="forgot-pass-btn" @click="showForgotPassword = !showForgotPassword">
              {{ showForgotPassword ? 'Back to login' : 'Forgot password' }}
            </p>
          </v-row>
          <v-row>
            <app-button
              :disabled="!valid"
              :label="showForgotPassword ? 'Send Email' : 'Login'"
              :is-block="true"
              color="accent"
              @click="showForgotPassword ? resetPassword() : login()"
            />
          </v-row>
        </v-col>
        <v-col cols="12" md="4" />
        <v-col cols="12" md="4">
          <v-img src="abacus.png" />
        </v-col>
      </v-row>
    </v-container>
    <v-alert
      v-model="displayAlert"
      dismissible
      :type="alertType"
      dense
      transition="scale-transition"
    >
      {{ alertMessage }}
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
    showForgotPassword: false,
    valid: false,
    email: '',
    password: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    alertMessage: '',
    alertType: ALERT_TYPES.ERROR,
    displayAlert: false,
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
        this.alertType = ALERT_TYPES.ERROR
        this.alertMessage = 'Wrong credentials. Please try again.'
        this.displayAlert = true
      }
    },
    async resetPassword () {
      try {
        await this.$store.dispatch('resetPassword', this.email)
        this.alertType = ALERT_TYPES.SUCCESS
        this.alertMessage = `Please check your ${this.email} inbox!`
        this.displayAlert = true
      } catch (error) {
        this.alertType = ALERT_TYPES.ERROR
        this.alertMessage = 'Something went wrong. Please try again.'
        this.displayAlert = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.forgot-pass-btn {
  color: whitesmoke;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
}
</style>
