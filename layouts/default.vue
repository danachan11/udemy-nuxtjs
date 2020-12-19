<template>
  <Nuxt />
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
  font-family: "B612", san-serif;
}
body {
  margin: 0;
}
</style>
