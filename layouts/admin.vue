<template>
  <div>
    <TheHeader
      @sidenavToggle="displaySidenav = !displaySidenav"
      :nav-items="navItems"
    />
    <TheSidenav :show="displaySidenav" @close="displaySidenav = false" />
    <Nuxt />
  </div>
</template>

<script>
import TheHeader from "@/components/Navigation/TheHeader";
import TheSidenav from "@/components/Navigation/TheSidenav";
export default {
  middleware: ["check-auth", "auth"],
  components: {
    TheHeader,
    TheSidenav
  },
  data() {
    return {
      displaySidenav: false,
      navItems: [
        {
          text: "Logout",
          to: "/logout"
        }
      ]
    };
  }
};
</script>

<style>
html {
  font-family: "B612", san-serif;
}
body {
  margin: 0;
}
</style>
