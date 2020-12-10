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
  components: {
    TheHeader,
    TheSidenav
  },
  data() {
    return {
      displaySidenav: false,
      navItems: [
        {
          text: "About",
          to: "/about"
        },
        {
          text: "Blogs",
          to: "/posts"
        },
        {
          text: "Admin",
          to: "/admin"
        }
      ]
    };
  }
};
</script>

<style>
html {
  font-family: "Open Sans", san-serif;
}
body {
  margin: 0;
}
</style>
