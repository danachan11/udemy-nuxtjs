<template>
  <!-- App.vue -->
  <v-app>
    <v-navigation-drawer
      app
      color="#135088"
    >
      <!-- -->
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
          </v-list-item-avatar>
        </v-list-item>
      </v-list>

      <v-list
        nav
        dense
      >
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Servers</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Shared with me</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Starred</v-list-item-title>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-app-bar app>
      MY SERVERS
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-card
          class="mx-auto"
          width="1400px"
        >

          <v-list-item link>
            <v-list-item-icon>
              <v-icon large color="#ffcc00">mdi-clock-alert</v-icon>
            </v-list-item-icon>
            <v-list-item-title>First time loading the server will take a few minutes to setup, please be patient. If you have any problem please contact us at @</v-list-item-title>
          </v-list-item>

        </v-card>
        <v-divider></v-divider>
        <v-card
          class="mx-auto"
          color="#49C144"
          width="1400px"
          hover
          loader-height="6"
          loading
        >
          <!--          <v-img-->
          <!--            :aspect-ratio="16/4"-->
          <!--            src="https://steamcdn-a.akamaihd.net/steam/apps/251570/ss_66ab2c612cb28b4b61974bcb3380a69274c4c127.1920x1080.jpg?t=1599069217"-->
          <!--          ></v-img>-->

          <v-simple-table light>
            <template v-slot:default>
              <thead>
              <tr>
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
              <tr
                v-for="item in server_names"
                :key="item.name"
              >
                <td>{{ item.name }}</td>
                <td>
                  <v-btn
                    depressed
                    color="#2FA7CC"
                  >
                    {{ item.ip_address }}
                  </v-btn>
                </td>
                <td>
                  <v-btn
                    depressed
                    color="#2FA7CC"
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
                <td>{{ item.valid_until }}</td>

              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-card
              class="mx-auto"
              color="#49C144"
              width="1400px"
              hover
              loader-height="6"
              loading
              v-bind="attrs"
              v-on="on"
            >
              <!--          <v-img-->
              <!--            :aspect-ratio="16/4"-->
              <!--            src="https://steamcdn-a.akamaihd.net/steam/apps/251570/ss_66ab2c612cb28b4b61974bcb3380a69274c4c127.1920x1080.jpg?t=1599069217"-->
              <!--          ></v-img>-->

              <v-simple-table light>
                <template v-slot:default>
                  <thead>
                  <tr>
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
                  <tr
                    v-for="item in server_names"
                    :key="item.name"
                  >
                    <td>{{ item.name }}</td>
                    <td>
                      <v-btn
                        depressed
                        color="#2FA7CC"
                      >
                        {{ item.ip_address }}
                      </v-btn>
                    </td>
                    <td>
                      <v-btn
                        depressed
                        color="#2FA7CC"
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
                    <td>{{ item.valid_until }}</td>

                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </template>
          <span>Press to config</span>
        </v-tooltip>
        <!-- If using vue-router -->
        <router-view>
        </router-view>
      </v-container>
    </v-main>


  </v-app>
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
      server_names: [
        {
          name: 'My awesome server name, man',
          ip_address: "192.168.0.1",
          port: 7777,
          slots: "0/32",
          status: "online",
          valid_until: "12 June 2020"
        },
      ],
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
}
</script>
