<template>
  <v-file-input
    v-model="image"
    show-size
    small-chips
    :prepend-icon="icon"
    :accept="accept"
    :label="label"
    @input="$emit('input', image)"
  />
</template>

<script>
import { ICONS } from '../../common/commonHelper'
export default {
  name: 'AppFileInput',
  props: {
    label: {
      type: String,
      default: ''
    },
    accept: {
      type: String,
      default: '*'
    },
    icon: {
      type: String,
      default: ICONS.CAMERA
    }
  },
  data () {
    return {
      ICONS,
      image: []
    }
  }
}
</script>
