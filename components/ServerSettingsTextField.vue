<template>
  <v-row v-show="show">
    <v-col cols="12" sm="7" class="mt-n2 mb-n2">
      <div>
        <h2>{{ title }}</h2>
        <h4 class="mt-2 ml-4">{{ description }}</h4>
      </div>
    </v-col>
    <v-col cols="12" sm="5" class="mt-n2 mb-n2">
      <v-text-field
        v-model="value"
        :label="label"
        outlined
        color="success"
        dense
        :type="type"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="12" class="mt-n2 mb-n2">
      <v-divider inset class="primary"></v-divider>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true
    },
    componentKey: {
      type: String,
      require: true
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: false
    },
    label: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    }
  },
}
</script>
