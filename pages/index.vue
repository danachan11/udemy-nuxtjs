<template>
  <div>
    <v-img
      min-height="200px"
      height="480"
      width="1920"
      src="https://i.ytimg.com/vi/c7vIIQkxC-4/maxresdefault.jpg"
      class="white--text"
      gradient="to top, rgba(150, 0, 0, .2), rgba(0, 0, 0, .8)"
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

                    <v-col class="d-flex" cols="12" sm="12" offset>
                      <h1 class="red--text">Sign up to get 1 day free trial</h1>
                    </v-col>

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

                    <v-col class="d-flex mb-n4" cols="12" sm="6">
                      <v-text-field
                        v-model="password"
                        :rules="[rules.required]"
                        label="Password"
                        outlined
                        counter
                        color="success"
                        type="password"
                      ></v-text-field>
                    </v-col>

                    <v-col class="d-flex" cols="12" sm="6">
                      <v-select
                        :rules="[rules.required]"
                        item-text="name"
                        item-value="last"
                        v-model="defaultWorld"
                        :items="people"
                        label="Game World"
                        outlined
                        color="success"
                        item-color="red"
                      ></v-select>
                    </v-col>

                    <v-col class="d-flex" cols="12" sm="6">
                      <v-select
                        :rules="[rules.required]"
                        item-text="name"
                        item-value="last"
                        v-model="defaultWorld"
                        :items="people"
                        label="Game World"
                        outlined
                        color="success"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-card outlined loading loader-height="4">
                        <v-list-item class="">
                          <v-list-item-content>
                            <div class="overline red--text font-weight-bold">
                              <h1>Standard plan</h1>
                            </div>
                            <div class="mt-4 mb-10">
                              <v-list-item-title class="headline mb-1 red--text font-weight-bold" align="center">
                                $ 16/mo
                              </v-list-item-title>
                            </div>
                            <v-col cols="12" sm="12" class="mb-n8 mt-n8">
                              <v-text-field
                                value="16 Max Players"
                                solo
                                outlined
                                readonly
                                background-color="#f1f1f1">
                                <v-icon slot="prepend" color="red" large>
                                  mdi-account
                                </v-icon>
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" class="mb-n8 mt-n4">
                              <v-text-field
                                value="8912 x 8912 Map Size"
                                solo
                                outlined
                                readonly
                                background-color="#f1f1f1">
                                <v-icon slot="prepend" color="red" large>
                                  mdi-map-outline
                                </v-icon>
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" align="center">
                              <v-btn :color="$vuetify.theme.themes.light.primary" width="40%" disabled>
                                Select
                              </v-btn>
                            </v-col>
                          </v-list-item-content>
                        </v-list-item>
                      </v-card>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-card outlined>
                        <v-list-item class="">
                          <v-list-item-content>
                            <div class="overline red--text font-weight-bold border">
                              <h1>Standard plan</h1>
                            </div>
                            <div class="mt-4 mb-10">
                              <v-list-item-title class="headline mb-1 red--text font-weight-bold" align="center">
                                $ 32/mo
                              </v-list-item-title>
                            </div>
                            <v-col cols="12" sm="12" class="mb-n8 mt-n8">
                              <v-text-field
                                value="16 Max Players"
                                solo
                                outlined
                                readonly
                                background-color="#f1f1f1">
                                <v-icon slot="prepend" color="red" large>
                                  mdi-account
                                </v-icon>
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" class="mb-n8 mt-n4">
                              <v-text-field
                                value="8912 x 8912 Map Size"
                                solo
                                outlined
                                readonly
                                background-color="#f1f1f1">
                                <v-icon slot="prepend" color="red" large>
                                  mdi-map-outline
                                </v-icon>
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" align="center">
                              <v-btn :color="$vuetify.theme.themes.light.primary" width="40%">
                                Select
                              </v-btn>
                            </v-col>
                          </v-list-item-content>
                        </v-list-item>
                      </v-card>
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

      defaultWorld: {
        name: "Navezgene",
        last: "World1"
      },
      people: [
        {
          name: "Navezgene",
          last: "World1"
        },
        {
          name: "OtherMap",
          last: "World2"
        }
      ],


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
