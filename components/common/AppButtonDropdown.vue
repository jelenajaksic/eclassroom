<template>
  <div class="text-center">
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn
          rounded
          large
          elevation="4"
          :color="color"
          v-bind="attrs"
          v-on="on"
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
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="selectItem(item)"
        >
          <v-icon
            v-if="item.icon"
            left
            light
            class="mr-2"
          >
            {{ item.icon }}
          </v-icon>
          <v-list-item-title>{{ getItemLabel(item) }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'AppButtonDropdown',
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
    },
    items: {
      type: Array,
      default: () => []
    },
    displayProperty: {
      type: String,
      default: 'label'
    }
  },
  methods: {
    selectItem (item) {
      this.$emit('selected', item)
    },
    getItemLabel (item) {
      return this.displayProperty ? item[this.displayProperty] : item
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-menu-wrapper {
  position: relative;

  .dropdown-menu {
    display: block;
    z-index: 40;
    position: absolute;
    right: 0;
    top: 3rem;
    min-width: fit-content;
    width: 100%;
    border: none;
    max-height: 15rem;
    overflow-x: hidden;

    .dropdown-item {
      padding: 0 2rem 0 1rem;
      height: 2.5rem;
      width: 100%;
      line-height: 2.5rem;

      background: right .375rem center no-repeat;
      overflow: hidden;
      text-overflow: ellipsis;

      cursor: pointer;
      font-size: .875rem;
    }
  }
}
</style>
