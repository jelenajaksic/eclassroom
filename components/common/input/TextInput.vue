<template>
  <v-textarea
    v-model="text"
    :label="label"
    type="textarea"
    auto-grow
    clearable-icon
    rows="1"
    :readonly="readonly"
    @input="$emit('input', text)"
  />
</template>

<script>

export default {
  name: 'TextInput',
  props: {
    label: {
      type: String,
      default: 'Paragraph'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    textInput: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      text: ''
    }
  },
  created () {
    if (this.textInput) {
      this.text = this.textInput
    }
  }
}
</script>
