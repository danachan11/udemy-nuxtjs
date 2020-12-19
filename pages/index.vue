<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get your free 7DTD server now!!!</h1>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    }
  }
};
</script>

<style scoped>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-size: contain;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url("~assets/images/main-bg-image.jpg");
}

.intro h1 {
  text-align: center;
  width: 90%;
  font-size: 1.5rem;
  color: red;
  padding: 10px;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
