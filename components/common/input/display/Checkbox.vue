<template>
  <div v-if="answers">
    <div v-for="answer in answers" :key="answer.label">
      <v-checkbox
        v-model="answer.correct"
        :label="answer.label"
        :readonly="readonly"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'CheckboxInput',
  props: {
    answers: {
      type: Array,
      default: () => []
    },
    readonly: {
      type: Boolean,
      default: false
    }
  }
}
</script>
