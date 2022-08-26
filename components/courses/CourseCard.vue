<template>
  <v-hover>
    <template #default="{ hover }">
      <v-card
        v-if="data"
        class="card-default mr-4 mb-4 pa-4"
        :class="hover? 'scale' : ''"
        :elevation="hover ? 2 : 0"
        @click="$emit('select', data.slug)"
      >
        <v-img
          :src="`http://localhost:8080/files?filename=${data.image}`"
          height="200px"
          contain
        />
        <v-overlay
          v-if="data.shortDescription && !isLesson && !isTest"
          absolute
          color="white"
          :value="hover"
          opacity="0.95"
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

        <v-card-subtitle v-if="isLesson" class="card-subtitle">
          {{ data.shortDescription }}
        </v-card-subtitle>
        <v-card-subtitle v-if="isTest && studentProgress">
          {{ `Your previous score: ${studentProgress}%` }}
        </v-card-subtitle>
        <v-progress-linear
          v-if="userRole === USERS.STUDENT && (isTest || isLesson)"
          rounded
          :value="studentProgressFormatted"
        />
      </v-card>
    </template>
  </v-hover>
</template>

<script>
import { USERS } from '../../common/commonHelper'

export default {
  name: 'AppCard',
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    isLesson: {
      type: Boolean,
      default: false
    },
    isTest: {
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
    studentProgress () {
      return this.userRole === USERS.STUDENT ? this.data.students[this.user.email] : ''
    },
    studentProgressFormatted () {
      if (this.userRole === USERS.STUDENT && this.isLesson) {
        const currProgress = this.studentProgress === '0' ? 0 : parseInt(this.studentProgress) + 1
        return Math.round((currProgress / this.data.sections.length) * 100)
      } else if (this.userRole === USERS.STUDENT && this.isTest) {
        return this.studentProgress
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.card-default {
  cursor: pointer;
  min-width: 300px;
  transition: all 0.3s ease;
}

.overlay-text {
  color: #39374b;
  text-align: center;
  max-width: 70%;
  margin: 0 auto;
}

.card-subtitle {
  min-height: 6rem;
  padding-top: 0.5rem;
}

.scale {
  transform: scale(1.05);
}
</style>
