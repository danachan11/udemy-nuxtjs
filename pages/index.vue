<template>
  <div>
    <v-img
      min-height="200px"
      height="480"
      width="1920"
      src="https://i.ytimg.com/vi/c7vIIQkxC-4/maxresdefault.jpg"
      class="white--text"
      gradient="to right, rgba(150, 0, 0, .2), rgba(0, 0, 0, .5)"
    >
    </v-img>
    <v-container>
      <v-layout wrap>
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="2" light tag="section">
            <v-divider></v-divider>
            <v-card-text>
              <v-form ref="form">
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
                        :rules="rules"
                        label="Password"
                        outlined
                        dense
                        counter
                        color="success"
                        type="password"
                      ></v-text-field>

                    </v-col>

                    <v-col
                      class="d-flex"
                      cols="12"
                      sm="6"
                    >
                      <v-select
                        :v-model="gameWorld"
                        :items="items"
                        item-value="Foo"
                        label="Game World"
                        dense
                        outlined
                        color="success"
                      ></v-select>
                    </v-col>

                    <v-col class="d-flex"
                           cols="12"
                           sm="12">
                      <v-btn
                        :color="$vuetify.theme.themes.light.primary"
                        @click="validate"
                        width="100%"
                      >
                        SIGN UP
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
  </div>
</template>

<style>
html {
  overflow-y: auto
}
</style>

<script>
export default {
  data() {
    return {
      gameWorld: "Foo",
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
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
  },
}
</script>
