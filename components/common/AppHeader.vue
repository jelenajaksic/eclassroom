<template>
  <v-container mb-4>
    <!--    <v-row>-->
    <!--      <v-breadcrumbs-->
    <!--        :items="COURSES_BREADCRUMBS"-->
    <!--      />-->
    <!--    </v-row>-->
    <v-row align="center" justify="center" cols="12">
      <v-col>
        <slot name="title" />
      </v-col>
      <v-col style="display: flex; justify-content: flex-end;">
        <slot name="headerButtons" />
      </v-col>
    </v-row>
  </v-container>
<!--  <v-app-bar-->
<!--    elevation="2"-->
<!--    color="white"-->
<!--    fixed-->
<!--  >-->
<!--    <slot name="title" />-->
<!--    <v-spacer/>-->
<!--    <slot name="headerButtons" />-->
<!--  </v-app-bar>-->
</template>

<script>
// import { COURSES_BREADCRUMBS } from '../../common/navigation'
export default {
  name: 'AppHeader'
  // data () {
  //   return {
  //     COURSES_BREADCRUMBS
  //   }
  // }
}
</script>
