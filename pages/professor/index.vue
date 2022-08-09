<template>
  <div>
    <h1>Professor</h1>
    <div>
      <app-button label="New Course" :icon="ICONS.PLUS" @click="newCourse" />
    </div>
  </div>
</template>

<script>
import AppButton from '../../components/common/AppButton'
import { ICONS } from '../../common/commonHelper'

export default {
  name: 'HomeProfessorPage',
  components: {
    AppButton
  },
  data () {
    return {
      ICONS
    }
  },
  methods: {
    newCourse () {
      this.$router.push('/professor/courses/new-course')
    }
  }
}
</script>
