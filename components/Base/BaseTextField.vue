<template>
  <v-col class="d-flex mb-n4" cols="12" sm="6">
    <v-text-field
      v-model="value"
      :rules="rules"
      :label="label"
      outlined
      :color="color"
      :class="myClass"
      :type="type"
    ></v-text-field>
  </v-col>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: ""
    },
    myClass: {
      type: String,
      require: false,
      default: ""
    },
    label: {
      type: String,
      required: false,
      default: ""
    },
    color: {
      type: String,
      required: false,
      default: "success"
    },
    value: {
      type: String,
      required: true
    },
    rules: {
      type: Array,
      required: false
    }
  }
}
</script>
