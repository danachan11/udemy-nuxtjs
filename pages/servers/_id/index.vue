<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
      class="mt-4"
    >
      <v-text-field
        class="ml-lg-16 mr-lg-16"
        hide-details
        label="Search settings"
        prepend-inner-icon="mdi-magnify"
        @input="debouncedInput"
        color="success"
        outlined
        v-model="searchValue"
        dense
      ></v-text-field>
      <v-btn width="220" @click="onShowOnlyChanged" color="primary" class="black--text">
        {{ showOnlyChangedButtonText }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn class="mr-8" color="#C0C0C0" @click="onSaveSettings">Save Settings</v-btn>
      <v-btn :color="$vuetify.theme.themes.light.primary" class="text--white"><h4 class="text--white">Save Settings &
        Restart</h4></v-btn>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto mt-16"
      max-height="800"
    >
      <v-flex sm12 md8 offset-md2>
        <v-card elevation="2" light tag="section">
          <v-card-text>
            <v-container fluid>
              <div v-for="setting in settings">
                <div v-if="setting.component === 'textField'">
                  <ServerSettingsTextField :show="setting.show" :componentKey="setting.key" :value="setting.value"
                                           :title="setting.title"
                                           :description="setting.description"
                                           :label="setting.label" :type="setting.type"/>
                </div>
                <div v-else>
                  <ServerSettingsSliderTick @sliderValueChanged="onSliderValueChanged" :show="setting.show"
                                            :componentKey="setting.key" :title="setting.title"
                                            :description="setting.description" :label="setting.label"
                                            :values="setting.values" :value="setting.value"
                                            :is-true-false-value="setting.isTrueFalse"/>
                </div>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>

    </v-sheet>
  </v-card>
</template>

<script>
import ServerSettingsTextField from "../../../components/ServerSettingsTextField";
import ServerSettingsSliderTick from "../../../components/ServerSettingsSliderTick";
import debounce from 'lodash.debounce'

export default {
  components: {ServerSettingsSliderTick, ServerSettingsTextField},
  middleware: ["check-auth", "auth", "appbar-check"],
  methods: {
    onSaveSettings() {
      const changedSettings = []
      this.settings.forEach(setting => {
        if (setting.isChanged === true) {
          delete setting.isChanged
          changedSettings.push(setting)
          console.log(`added setting ${setting.key} value: ${setting.value} , is true false: ${setting.isTrueFalse}`)
        }
      })
      const params = {"changedSettings": changedSettings, "serverId": this.$route.params.id}
      this.$store.dispatch('saveSettings', params)
    },
    onShowOnlyChanged() {
      this.showOnlyChanged = !this.showOnlyChanged
      if (!this.showOnlyChanged) {
        this.showOnlyChangedButtonText = "Show only changed"
        this.settings.forEach(setting => {
          setting.show = true
        })
      } else {
        this.showOnlyChangedButtonText = "Show all"
        this.settings.forEach(setting => {
          if (!setting.isChanged === true) {
            setting.show = false
          } else {
            setting.show = true
          }
        })
        this.searchValue = ""
      }
    },
    onSliderValueChanged(changedSetting) {
      let foundSetting = this.settings.find(setting => setting.key === changedSetting.key)
      if (!foundSetting) {
        console.log(`changed not found wtf returning`)
        return
      } else {
        const settingIndex = this.settings.indexOf(foundSetting)
        this.settings[settingIndex] = changedSetting
      }
    },
    debouncedInput: debounce(function (v) {
      this.searchSettings()
    }, 400),
    searchSettings() {
      this.showOnlyChanged = false
      this.showOnlyChangedButtonText = "Show only changed"

      this.settings.forEach(setting => {
        if (!setting.title.toLowerCase().includes(this.searchValue)) {
          setting.show = false
        } else {
          setting.show = true
          console.log(`found these shits ${setting.title}`)
        }
      })
    },
  },
  data() {
    return {
      showOnlyChanged: false,
      showOnlyChangedButtonText: "Show only changed",
      searchValue: "",
    }
  },
  asyncData({app, params, store}) {

    const token = store.state.token

    return app.$axios
      .$get("/api/users/get_config", { params: {"serverId": params.id}, headers: {Authorization: `Bearer ${token}`}})
      .then(response => {
        console.log(`my response ${response}`)
        return {
          settings: response.settings
        }
      })
      .catch(e => {

      });
  },
}
</script>

<style>
@keyframes metronome-example {
  from {
    transform: scale(.5);
  }

  to {
    transform: scale(1);
  }
}

.v-avatar--metronome {
  animation-name: metronome-example;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
</style>
