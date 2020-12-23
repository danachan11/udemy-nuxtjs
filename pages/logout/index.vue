<template>
    <MyLoading :is-loading="isLoading"/>
</template>


<script>
import MyLoading from "../../components/MyLoading";
export default {
  components: {
    MyLoading,
  },
  data() {
    return {
      isLoading: true,
    }
  },
  mounted() {
    this.$store.dispatch("signout");
    this.$router.push("/login");
  }
}
</script>

<style lang="scss" scoped></style>
