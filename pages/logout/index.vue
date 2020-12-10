<template>
  <div>
    <h1>User logging out</h1>
  </div>
</template>

<script>
export default {
  layout: "non-header",
  mounted() {
    this.$store.dispatch("signout");
    this.$router.push("/auth");
  }
};
</script>

<style lang="scss" scoped></style>
