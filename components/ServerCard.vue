<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-card
        class="mx-auto mb-8"
        color="#49C144  "
        width="1400px"
        hover
        v-bind="attrs"
        v-on="on"
        @click="serverClicked"
        :ripple="false"
      >
        <v-img
          :src="src"
          :aspect-ratio="16/4"
          gradient="to right, rgba(255,0,0,.1), rgba(0,0,0,.7)"
        >
        </v-img>
        <v-simple-table light>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text--left">
              </th>
              <th class="text-left">
                NAME
              </th>
              <th class="text-left">
                IP ADDRESS
              </th>
              <th class="text-left">
                PORT
              </th>
              <th class="text-left">
                SLOTS
              </th>
              <th class="text-left">
                STATUS
              </th>
              <th class="text-left">
                VALID UNTIL
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in serverInfo" :key="item.name">
              <td>
                <v-btn
                  depressed
                  :color="$vuetify.theme.themes.light.primary"
                  align="center"
                  @click.stop="serverClicked"
                >
                  Config
                </v-btn>
              </td>
              <td>{{ item.server_name }}</td>
              <td>
                <v-btn
                  depressed
                  color="#C0C0C0"
                  v-on:click.prevent
                  @click.stop="hello2"
                  min-width="200px"
                >
                  {{ item.ip_address }}
                </v-btn>
              </td>
              <td>
                <v-btn
                  depressed
                  color="#C0C0C0"
                  v-on:click.prevent
                  @click.stop="hello2"
                  min-width="100px"
                >
                  {{ item.port }}
                </v-btn>
              </td>
              <td>{{ item.slots }}</td>
              <td>
                <v-btn
                  depressed
                  color="#49C144"
                >
                  {{ item.status }}
                </v-btn>
              </td>
              <td>{{ item.valid_until }}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </template>
    <span>Press to config</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Object,
      required: false
    },
    src: {
      type: String,
      required: true
    },
    serverInfo: {
      type: Array,
      required: true
    }
  },
  methods: {
    serverClicked() {
      this.$emit('serverClicked', this.serverInfo[0])
    },
    hello() {
      console.log(`hello man`)
    },
    hello2() {
      console.log(`hello 2`)
    }
  }
}
</script>
