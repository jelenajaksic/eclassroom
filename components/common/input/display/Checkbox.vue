<template>
  <div v-if="answers">
    <div v-for="(answer, index) in answers" :key="index">
      <v-checkbox
        :id="`${answer.label}-${index}`"
        v-model="answer.correct"
        :label="answer.label"
        :readonly="readonly"
      />
    </div>
  </div>
</template>

<script>
import { ICONS } from '../../../../common/commonHelper'

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
  },
  data () {
    return {
      ICONS
    }
  }
}
</script>
