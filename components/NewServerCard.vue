<template>
  <v-flex sm12 md6 offset-md3>
    <v-card elevation="0" light tag="section" align="center">
      <v-row align="center">
        <v-col cols="12" sm="12">
          <v-btn width="70%" color="primary" class="black--text font-weight-bold">NEW SERVER</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  methods: {
    serverClicked() {
      this.$emit('serverClicked', this.serverInfo[0])
    },
  }
}
</script>
