<template>
  <v-container fluid>
    <v-card class="mx-auto mb-8" width="1400px">
      <v-list-item link>
        <v-list-item-icon>
          <v-icon large color="orange">mdi-clock-alert</v-icon>
        </v-list-item-icon>
        <v-list-item-title>First time loading the server will take a few minutes to setup, please be patient. If you
          have any problem please contact us at @
        </v-list-item-title>
      </v-list-item>
    </v-card>
    <div v-for="(server, index) in servers" :key="index">
      <ServerCard @serverClicked="onServerClicked" :src="src" :server-info="server" :is-loaded="isLoaded"></ServerCard>
    </div>
    <div >
      <NewServerCard></NewServerCard>
    </div>
  </v-container>
</template>

<style>
html {
  overflow-y: auto
}
</style>


<script>
import ServerCard from "../../components/ServerCard";
import NewServerCard from "../../components/NewServerCard";

export default {
  components: {NewServerCard, ServerCard},
  middleware: ["check-auth", "auth", "appbar-check"],
  asyncData({context, app, store}) {

    const token = store.state.token

    const config = {
      headers: {Authorization: `Bearer ${token}`}
    };
    return app.$axios
      .$get(app.$axios.defaults.baseURL + "/api/users/get_servers", config)
      .then(response => {
        return {
          servers: response.data
        }
      })
      .catch(e => {

      });
  },
  data() {
    return {
      isLoaded: false,
      src: "https://steamcdn-a.akamaihd.net/steam/apps/251570/ss_66ab2c612cb28b4b61974bcb3380a69274c4c127.1920x1080.jpg?t=1599069217",
      // servers2: [
      //   [
      //     {
      //       name: "My awesome servers name, man",
      //       ip_address: "192.168.0.122",
      //       port: 7777,
      //       slots: "0/32",
      //       status: "online",
      //       valid_until: "12 June 2020"
      //     },
      //   ],
      //   [
      //     {
      //       "name": "My awesome servers name, man",
      //       "ip_address": "192.168.0.122222",
      //       "port": 7777,
      //       "slots": "0/32",
      //       "status": "online",
      //       "valid_until": "12 June 2020"
      //     },
      //   ],
      //   [
      //     {
      //       name: 'My awesome servers name, man',
      //       ip_address: "192.168.0.39292",
      //       port: 7777,
      //       slots: "0/32",
      //       status: "online",
      //       valid_until: "12 June 2020"
      //     },
      //   ],
      // ],
      messages: [
        {
          from: 'You',
          message: `Sure, I'll see you later.`,
          time: '10:42am',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'John Doe',
          message: 'Yeah, sure. Does 1:00pm work?',
          time: '10:37am',
          color: 'green',
        },
        {
          from: 'You',
          message: 'Did you still want to grab lunch today?',
          time: '9:47am',
          color: 'deep-purple lighten-1',
        },
      ],
    }
  },
  methods: {
    onServerClicked(server) {
      this.$router.push(`/servers/${server._id}`)
    }
  },
  mounted() {
    this.isLoaded = true
  }
}
</script>
