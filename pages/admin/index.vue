<template>
  <div class="admin-page">
    <section class="new-post">
      <AppButton @click="setupServer">Setup server</AppButton>
      <AppButton @click="startServer">Start server</AppButton>
      <AppButton @click="stopServer">Stop server</AppButton>
    </section>
  </div>
</template>

<script>
export default {
  layout: "admin",
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    }
  },
  methods: {
    setupServer() {
      this.$store
        .dispatch("setupServer")
        .then(() => {
          console.log("success");
        })
        .catch(e => {
          console.log(e);
        });
    },
    startServer() {
      this.$store
        .dispatch("startServer")
        .then(() => {
          console.log("success");
        })
        .catch(e => {
          console.log(e);
        });
    },
    stopServer() {}
  }
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: lef;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>
