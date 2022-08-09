<template>
  <!--  <v-snackbar-->
  <!--    v-model="snackbar"-->
  <!--    :timeout="timeout"-->
  <!--  >-->
  <!--    <v-alert-->
  <!--      dense-->
  <!--      :type="type"-->
  <!--    >-->
  <!--      {{ message }}-->
  <!--    </v-alert>-->
  <!--&lt;!&ndash;    <template #action="{ attrs }">&ndash;&gt;-->
  <!--&lt;!&ndash;      <v-btn&ndash;&gt;-->
  <!--&lt;!&ndash;        color="blue"&ndash;&gt;-->
  <!--&lt;!&ndash;        text&ndash;&gt;-->
  <!--&lt;!&ndash;        v-bind="attrs"&ndash;&gt;-->
  <!--&lt;!&ndash;        @click="snackbar = false"&ndash;&gt;-->
  <!--&lt;!&ndash;      >&ndash;&gt;-->
  <!--&lt;!&ndash;        Close&ndash;&gt;-->
  <!--&lt;!&ndash;      </v-btn>&ndash;&gt;-->
  <!--&lt;!&ndash;    </template>&ndash;&gt;-->
  <!--  </v-snackbar>-->
  <v-alert
    v-model="alert"
    dismissible
    :type="type"
    dense
    transition="scale-transition"
  >
    {{ message }}
  </v-alert>
</template>

<script>
import { ALERT_TYPES } from '../../common/commonHelper'

export default {
  name: 'AlertComponent',
  props: {
    // TODO: delete component?
    // timeout: {
    //   type: Number,
    //   default: 2000
    // },
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ALERT_TYPES.SUCCESS
    },
    display: {
      type: Boolean,
      default: false
    }
    // show: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data () {
    return {
      // snackbar: this.show,
      ALERT_TYPES,
      alert: this.display
    }
  }
}
</script>
