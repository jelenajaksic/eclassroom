<template>
  <v-hover>
    <template #default="{ hover }">
      <v-card
        v-if="data"
        class="card-default mr-4 mb-4 pa-4"
        :elevation="hover ? 2 : 0"
        @click="$emit('select', data.slug)"
      >
        <v-img
          :src="data.image"
          height="200px"
        />
        <v-overlay
          v-if="data.shortDescription && !isLesson"
          absolute
          color="white"
          :value="hover"
          opacity="1"
          class="mt-4"
          style="height: 200px"
        >
          <p class="overlay-text">
            {{ data.shortDescription }}
          </p>
        </v-overlay>
        <v-card-title v-if="data.title">
          {{ data.title }}
        </v-card-title>

        <v-card-subtitle v-if="data.shortDescription && isLesson">
          {{ data.shortDescription }}
        </v-card-subtitle>
        <v-progress-linear
          v-if="hasStudentProgress"
          rounded
          :value="studentProgress"
        />
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import { USERS } from '../../common/commonHelper'

export default {
  name: 'CourseCard',
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    isLesson: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: false,
      USERS
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    userRole () {
      return this.$store.getters.getUserRole
    },
    hasStudentProgress () {
      // return this.userRole === USERS.STUDENT && (this.data.students[this.user.email]?.length > 0)
      return false
    },
    studentProgress () {
      return this.isLesson ? this.data.students[this.user.email].find(lesson => lesson.id === this.data.id).progress : '0'
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-default {
    cursor: pointer;
    min-width: 300px;
  }
  .overlay-text {
    color: #000000;
    opacity: 50%;
    text-align: center;
    max-width: 70%;
    margin: 0 auto;
  }
</style>
