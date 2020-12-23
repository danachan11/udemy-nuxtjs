<template>
  <loading :active.sync="isLoading"
           :is-full-page="true"
           color="#add8e6"
  ></loading>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  components: {
    Loading
  },
  props: {
    isLoading: {
      type: Boolean,
      require: false
    }
  }
}
</script>
