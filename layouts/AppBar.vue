<template>
  <div>
    <v-app-bar
      id="home-app-bar"
      app
      color="primary"
      elevation="1"
      height="60"
    >
      <v-img
        :src="require('@/assets/logo.svg')"
        class="mr-3 hidden-xs-only"
        contain
        max-width="52"
        width="100%"
      />

      <v-spacer/>

      <div>
        <v-tabs
          class="hidden-sm-and-down"
          optional
          background-color="primary"
        >
          <v-tab
            v-for="(item) in items"
            :key="item.name"
            :to="item.to"
            :exact="item.name === 'Home'"
            :ripple="false"
            active-class="black--text"
            class="font-weight-bold black--text"
            min-width="96"
            text
          >
            {{ item.name }} {{ item.id }}
          </v-tab>
        </v-tabs>
      </div>

      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      />
    </v-app-bar>

    <home-drawer
      v-model="drawer"
      :items="items"
    />
  </div>
</template>

<script>
export default {
  name: 'HomeAppBar',

  components: {
    HomeDrawer: () => import('./Drawer'),
  },
  computed: {
    items() {
      return this.$store.state.appbarItems
    }
  },
  data: () => ({
    drawer: null
  }),
}
</script>

<style lang="sass">
#home-app-bar
  .v-tabs-slider
    max-width: 24px
    margin: 0 auto

  .v-tab
    &::before
      display: none
</style>
