<template>
  <div>
    <AppHeader>
      <template slot="title">
        <h1>
          Profile
        </h1>
      </template>
      <template slot="headerButtons">
        <app-button v-if="!edit" label="Edit Profile" :icon="ICONS.EDIT" @click="editProfile" />
        <app-button v-if="edit" label="Cancel" class="mr-4" @click="cancel" />
        <app-button v-if="edit" label="Save" :disabled="!valid" @click="save" />
      </template>
    </AppHeader>
    <v-container mx-auto class="mt-10">
      <v-row align="center">
        <v-col lg="4">
          <v-img
            src="person3.png"
            contain
          />
        </v-col>
        <v-col lg="2" />
        <v-col lg="6">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              label="Name"
              :readonly="!edit"
            />
            <v-text-field
              v-model="email"
              label="Email"
              :readonly="!edit"
              :rules="emailRules"
            />
            <v-text-field
              v-if="!edit"
              v-model="password"
              type="password"
              label="Password"
              readonly
            />
            <v-text-field
              v-if="edit"
              v-model="oldPass"
              type="password"
              label="Old Password"
              :rules="oldPasswordRules"
            />
            <v-text-field
              v-if="edit"
              v-model="newPass"
              hide-details
              type="password"
              label="New Password"
            />
            <v-text-field
              v-if="edit"
              v-model="reenterNewPass"
              hide-details
              type="password"
              label="Reenter New Password"
              :rules="reenterNewPassRules"
            />
            <!--            <app-button v-if="edit" label="Cancel" :is-block="true" button-class="mt-10" @click="cancel" />-->
            <!--            <app-button-->
            <!--              v-if="edit"-->
            <!--              :disabled="!valid"-->
            <!--              label="Save"-->
            <!--              :is-block="true"-->
            <!--              button-class="mt-10"-->
            <!--              @click="save"-->
            <!--            />-->
          </v-form>
        </v-col>
        <!--        <v-col lg="6">-->
        <!--          <v-row>-->
        <!--            <v-text-field-->
        <!--              v-model="name"-->
        <!--              label="Name"-->
        <!--              :readonly="!edit.name"-->
        <!--            />-->
        <!--            <v-icon v-if="!edit.name" left light class="ml-5" @click="edit.name = true">-->
        <!--              {{ ICONS.EDIT }}-->
        <!--            </v-icon>-->
        <!--            <v-icon v-if="edit.name" left light class="ml-5" @click="cancel('name')">-->
        <!--              {{ ICONS.CLOSE }}-->
        <!--            </v-icon>-->
        <!--            <v-icon v-if="edit.name" left light class="ml-5" @click="saveName()">-->
        <!--              {{ ICONS.SAVE }}-->
        <!--            </v-icon>-->
        <!--          </v-row>-->
        <!--          <v-row>-->
        <!--            <v-text-field-->
        <!--              v-model="email"-->
        <!--              label="Email"-->
        <!--              :readonly="!edit.email"-->
        <!--              :rules="emailRules"-->
        <!--            />-->
        <!--            <v-icon v-if="!edit.email" left light class="ml-5" @click="edit.email = true">-->
        <!--              {{ ICONS.EDIT }}-->
        <!--            </v-icon>-->
        <!--            <v-icon v-if="edit.email" left light class="ml-5" @click="cancel('email')">-->
        <!--              {{ ICONS.CLOSE }}-->
        <!--            </v-icon>-->
        <!--            <v-icon v-if="edit.email" left light class="ml-5" @click="saveEmail()">-->
        <!--              {{ ICONS.SAVE }}-->
        <!--            </v-icon>-->
        <!--          </v-row>-->
        <!--          <v-row v-if="!edit.password">-->
        <!--            <v-text-field-->
        <!--              v-model="password"-->
        <!--              type="password"-->
        <!--              label="Password"-->
        <!--              :readonly="true"-->
        <!--            />-->
        <!--            <v-icon left light class="ml-5" @click="edit.password = true">-->
        <!--              {{ ICONS.EDIT }}-->
        <!--            </v-icon>-->
        <!--          </v-row>-->
        <!--          <v-row v-if="edit.password">-->
        <!--            <v-text-field-->
        <!--              v-model="oldPass"-->
        <!--              hide-details-->
        <!--              type="password"-->
        <!--              label="Old Password"-->
        <!--              :rules="oldPasswordRules"-->
        <!--            />-->
        <!--            <v-icon v-if="edit.password" left light class="ml-5" @click="cancel('password')">-->
        <!--              {{ ICONS.CLOSE }}-->
        <!--            </v-icon>-->
        <!--            <v-icon v-if="edit.password" left light class="ml-5" @click="savePassword()">-->
        <!--              {{ ICONS.SAVE }}-->
        <!--            </v-icon>-->
        <!--          </v-row>-->
        <!--          <v-row v-if="edit.password">-->
        <!--            <v-text-field-->
        <!--              v-model="newPass"-->
        <!--              hide-details-->
        <!--              type="password"-->
        <!--              label="New Password"-->
        <!--            />-->
        <!--          </v-row>-->
        <!--          <v-row v-if="edit.password">-->
        <!--            <v-text-field-->
        <!--              v-model="reenterNewPass"-->
        <!--              hide-details-->
        <!--              type="password"-->
        <!--              label="Reenter Password"-->
        <!--              :rules="reenterNewPassRules"-->
        <!--            />-->
        <!--          </v-row>-->
        <!--        </v-col>-->
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AppHeader from '../../components/common/AppHeader'
import AppButton from '../../components/common/AppButton'
import { ICONS } from '../../common/commonHelper'

export default {
  name: 'ProfilePage',
  components: {
    AppHeader,
    AppButton
  },
  data () {
    return {
      name: '',
      email: '',
      password: '',
      newPass: '',
      oldPass: '',
      reenterNewPass: '',
      // edit: {
      //   name: false,
      //   email: false,
      //   password: false
      // },
      edit: false,
      ICONS,
      valid: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      oldPasswordRules: [
        v => v === this.profileData.password || 'Password is incorrect'
      ],
      reenterNewPassRules: [
        v => v === this.newPass || 'Password does not match new password'
      ]
    }
  },
  computed: {
    profileData () {
      return this.$store.getters.getUser
    }
  },
  created () {
    this.initProfileData()
  },
  methods: {
    initProfileData () {
      this.name = this.profileData.name
      this.email = this.profileData.email
      this.password = this.profileData.password
    },
    cancel () {
      this.edit = false
      this.initProfileData()
    },
    save () {
      this.edit = false
      const profile = {
        name: this.name,
        password: this.newPass,
        email: this.email
      }
      this.$store.dispatch('profile/updateProfile', profile)
    },
    editProfile () {
      this.edit = true
      this.oldPass = ''
      this.newPass = ''
      this.reenterNewPass = ''
    }
    // saveEmail () {
    //   this.edit.email = false
    //   this.$store.dispatch('profile/updateEmail', this.email)
    // },
    // saveName () {
    //   this.edit.name = false
    //   this.$store.dispatch('profile/updateName', this.name)
    // },
    // savePassword () {
    //   this.edit.password = false
    //   this.$store.dispatch('profile/updatePassword', this.newPass)
    // }
  }
}
</script>
