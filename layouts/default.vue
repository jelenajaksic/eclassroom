<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      fixed
      app
    >
      <v-list>
        <v-list-item-group
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in navItems"
            :key="i"
            :to="item.to"
            router
            exact
            @click="takeAction(item)"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-list>
        <v-list-item
          exact
        >
          <v-list-item-action style="cursor: pointer;" @click.stop="miniVariant = !miniVariant">
            <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { getNavItems } from '../common/navigation'

export default {
  name: 'DefaultLayout',
  middleware: 'auth',
  data () {
    return {
      drawer: true,
      miniVariant: false
    }
  },
  computed: {
    userRole () {
      return this.$store.getters.getUserRole
    },
    navItems () {
      return getNavItems(this.userRole)
    }
  },
  methods: {
    takeAction (item) {
      if (item?.action) {
        item.action()
      }
    }
  }
}
</script>
