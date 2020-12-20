<template>
  <v-app>

    <home-app-bar/>

    <home-view/>

  </v-app>
</template>

<script>
export default {
  name: 'HomeLayout',

  components: {
    HomeAppBar: () => import('@/layouts/AppBar'),
    HomeFooter: () => import('@/layouts/Footer'),
    HomeView: () => import('@/layouts/View'),
  },
}
</script>
