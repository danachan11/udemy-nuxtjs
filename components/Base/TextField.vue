<template>
  <v-col class="d-flex mb-n4" cols="12" sm="6">
    <v-text-field
      v-model="email"
      :rules="[rules.required, rules.email]"
      label="Email address"
      outlined
      color="success"
      class=""
    ></v-text-field>
  </v-col>
</template>
