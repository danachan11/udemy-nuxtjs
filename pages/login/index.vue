<template>
  <div>
    <MyLoading :is-loading="isLoading"/>
    <v-card class="overflow-hidden">
      <v-sheet
        id="scrolling-techniques-7"
        class="overflow-y-auto mt-16"
        max-height="1080"
      >
        <v-container>
          <v-layout wrap>
            <v-flex sm12 md6 offset-md3>
              <v-card elevation="2" light tag="section">
                <v-card-text>
                  <v-form ref="loginForm"
                          lazy-validation>
                    <v-container fluid>
                      <v-row align="center">
                        <v-col class="d-flex mb-n4" cols="12" sm="6">
                          <v-text-field
                            v-model="email"
                            :rules="[rules.required, rules.email]"
                            label="Email address"
                            outlined
                            color="success"
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
                        <v-col class="d-flex" cols="12" sm="12">
                          <v-btn :color="$vuetify.theme.themes.light.primary" @click="signin" width="100%">
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

      </v-sheet>
    </v-card>
  </div>
</template>

<script>
import MyLoading from "../../components/MyLoading";

export default {
  middleware: ['appbar-check'],
  components: {MyLoading},
  data() {
    return {
      isLoading: false,
      valid: true,
      password: "",
      email: "",
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
    validateForm() {
      return this.$refs.loginForm.validate()
    },
    async signin() {
      this.isLoading = true
      const bo = this.validateForm()
      if (!bo) {
        console.log(`form is not validated`)
        this.isLoading = false
        return
      }
      console.log(`form is validated`)
      console.log(`email: ${this.email} password: ${this.password}`)

      await this.$store.dispatch('login', {email: this.email, password: this.password})
        .then(() => {
          this.isLoading = false
          this.$router.push('/servers')
        }).catch(e => {
        this.isLoading = false
        })
    }
  },
}
</script>

