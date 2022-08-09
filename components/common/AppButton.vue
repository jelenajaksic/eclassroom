<template>
  <v-btn
    rounded
    large
    :block="isBlock"
    elevation="4"
    :disabled="disabled"
    :color="color"
    :class="buttonClass"
    @click="$emit('click', $event)"
  >
    <v-icon
      v-if="icon"
      left
      light
    >
      {{ icon }}
    </v-icon>
    <span v-if="label">{{ label }}</span>
  </v-btn>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    },
    isBlock: {
      type: Boolean,
      default: false
    },
    buttonClass: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>
