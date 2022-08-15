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
        <app-button v-if="edit" label="Cancel" :outlined="true" class="mr-4" @click="cancel" />
        <app-button v-if="edit" label="Save" :disabled="!valid" @click="save" />
      </template>
    </AppHeader>
    <v-container mx-auto class="mt-10">
      <v-row align="center">
        <v-col md="4" lg="4">
          <v-img
            :src="profileImage"
            contain
          />
        </v-col>
        <v-col md="1" lg="1" />
        <v-col md="5" lg="5">
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
              type="password"
              label="New Password"
            />
            <v-text-field
              v-if="edit"
              v-model="reenterNewPass"
              type="password"
              label="Reenter New Password"
              :rules="reenterNewPassRules"
            />
          </v-form>
        </v-col>
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
    },
    profileImage () {
      return this.profileData.admin ? 'person2.png' : 'person3.png'
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
