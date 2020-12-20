<template>

  <v-container>
    <v-layout wrap>
      <v-flex sm12 md6 offset-md3>
        <v-card elevation="2" light tag="section">
          <v-divider></v-divider>
          <v-card-text>
            <v-form ref="form"
                    v-model="valid"
                    lazy-validation>
              <v-container fluid>
                <v-row align="center">
                  <v-col class="d-flex"
                         cols="12"
                         sm="6">
                    <v-text-field
                      v-model="email"
                      :rules="[rules.required, rules.email]"
                      label="Email address"
                      outlined
                      dense
                      color="success"
                    ></v-text-field>
                  </v-col>
                  <v-col class="d-flex"
                         cols="12"
                         sm="6">
                    <v-text-field
                      v-model="password"
                      :rules="[rules.required]"
                      label="Password"
                      outlined
                      dense
                      counter
                      color="success"
                      type="password"
                    ></v-text-field>

                  </v-col>
                  <v-col class="d-flex"
                         cols="12"
                         sm="12">
                    <v-btn
                      :color="$vuetify.theme.themes.light.primary"
                      @click="validate"
                      width="100%"
                    >
                      LOG IN
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>

            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      password: "",
      email: "",
      showPassword: false,
      rules: {
        required: value => !!value || 'Required.',
        counter: value => value.length <= 20 || 'Max 20 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
  },
}
</script>
