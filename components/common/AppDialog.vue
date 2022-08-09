<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card>
        <v-card-title v-if="title" class="text-h5">
          {{ title }}
        </v-card-title>

        <v-card-text v-if="text">
          {{ text }}
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            v-if="secondaryButtonLabel"
            color="primary"
            text
            @click="secondaryAction"
          >
            {{ secondaryButtonLabel }}
          </v-btn>

          <v-btn
            v-if="primaryButtonLabel"
            color="primary"
            text
            @click="primaryAction"
          >
            {{ primaryButtonLabel }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'AppDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    primaryButtonLabel: {
      type: String,
      default: ''
    },
    secondaryButtonLabel: {
      type: String,
      default: ''
    },
    openDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  created () {
    this.dialog = this.openDialog
  },
  methods: {
    secondaryAction () {
      this.dialog = false
      this.$emit('secondary')
    },
    primaryAction () {
      this.dialog = false
      this.$emit('primary')
    }
  }
}
</script>
