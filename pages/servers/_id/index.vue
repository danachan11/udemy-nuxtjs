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
        v-model="value"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn class="mr-8" color="#C0C0C0">Save Settings</v-btn>
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
                  <ServerSettingsTextField :componentKey="setting.key" :value="setting.value" :title="setting.title"
                                           :description="setting.description"
                                           :label="setting.label" :type="setting.type"/>
                </div>
                <div v-else>
                  <ServerSettingsSliderTick @sliderValueChanged="onSliderValueChanged" :componentKey="setting.key"
                                            :value="setting.value" :title="setting.title"
                                            :description="setting.description"
                                            :values="setting.values"/>
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
  methods: {
    onSliderValueChanged(setting) {
      console.log(`key: ${setting.key} value: ${setting.value}`)
      const foundSetting = this.changedSettings.find(setting => setting.key === setting.key)
      if(!foundSetting){
        this.changedSettings.push(setting)
        console.log(`changed not found`)
      }else{
        const index = this.changedSettings.indexOf(foundSetting)
        this.changedSettings[index] = setting
      }


      this.changedSettings.forEach(setting => {
        console.log(`changed setting ${setting.value}`)
      })

    },
    debouncedInput: debounce(function (v) {
      this.searchSettings()
    }, 400),
    searchSettings() {
      console.log(`searching settings with value ${this.value}`)
      const foundSettings = []
      this.defaultSettings.forEach(setting => {
        if (setting.title.toLowerCase().includes(this.value)) {
          console.log(`setting found ${setting.title}`)
          foundSettings.push(setting)
        }
      })
      this.settings = foundSettings
    },
  },
  data() {
    return {
      value: "",
      settings: [
        {
          component: "textField",
          key: "GameWorld",
          value: "Navezgane",
          title: "Game World",
          description: "See WorldGenSeed and WorldGenSize options below) or any already existing world name in the Worlds folder (currently shipping with e.g. Navezgane, PREGEN01, ...)",
          label: ""
        },
        {
          component: "textField",
          key: "WorldGenSeed",
          value: "asdf",
          title: "World Gen Seed",
          description: "If RWG this is the seed for the generation of the new world. If a world with the resulting name already exists it will simply load it ",
          label: ""
        },
        {
          component: "textField",
          key: "WorldGenSize",
          value: "4096",
          title: "World Gen Size",
          description: "If RWG this controls the width and height of the created world. It is also used in combination with WorldGenSeed to create the internal RWG seed thus also creating a unique map name even if using the same WorldGenSeed. Has to be between 2048 and 16384, though large map sizes will take long to generate / download / load",
          label: ""
        },
        {
          component: "textField",
          key: "GameName",
          value: "My Game",
          title: "Game Name",
          description: "Whatever you want the game name to be. This affects the save game name as well as the seed used when placing decoration (trees etc) in the world. It does not control the generic layout of the world if creating an RWG world",
          label: ""
        },
        {
          component: "textField",
          key: "ServerName",
          title: "Server Name",
          description: "Whatever you want the name of the server to be.",
          label: ""
        },
        {
          component: "textField",
          key: "ServerDescription",
          title: "Server Description",
          description: "Whatever you want the server description to be, will be shown in the server browser.",
          label: ""
        },
        {
          component: "textField",
          key: "ServerPassword",
          title: "Server Password",
          description: "Password to gain entry to the server.",
          label: "",
          type: "password"
        },
        {
          component: "sliderTick",
          key: "ServerVisibility",
          title: "Server Visibility",
          description: "The visibility of this server.",
          label: "",
          values: [
            'Public',
            'Only Shown to Friends',
            'Not Listed'
          ],
          value: 2
        },
        {
          component: "textField",
          key: "ServerMaxPlayerCount",
          title: "Server Max Player Count",
          description: "Maximum Concurrent Players.",
          label: "",
        },
        {
          component: "sliderTick",
          key: "EACEnabled",
          title: "EAC Enabled",
          description: "Enables/Disables EasyAntiCheat",
          label: "",
          values: [
            'Disable',
            'Enable'
          ],
        },
        {
          component: "sliderTick",
          key: "GameDifficulty",
          title: "Game Difficulty",
          description: "0 - 5, 0=easiest, 5=hardest",
          label: "",
          values: [
            'Easiest',
            'Easy',
            'Normal',
            'Hard',
            'Hardest'
          ],
          value: 4
        },
        {
          component: "textField",
          key: "BlockDamagePlayer",
          value: "100",
          title: "Block Damage Player",
          description: "How much damage do players to blocks (percentage in whole numbers).",
          label: "",
        },
        {
          component: "textField",
          key: "BlockDamageAI",
          value: "100",
          title: "Block Damage AI",
          description: "How much damage do AIs to blocks (percentage in whole numbers).",
          label: "",
        },
        {
          component: "textField",
          key: "BlockDamageAIBM",
          value: "100",
          title: "Block Damage AIBM",
          description: "How much damage do AIs during blood moons to blocks (percentage in whole numbers).",
          label: "",
        },
        {
          component: "textField",
          key: "XPMultiplier",
          value: "100",
          title: "XP Multiplier",
          description: "XP gain multiplier (percentage in whole numbers).",
          label: "",
        },
        {
          component: "textField",
          key: "PlayerSafeZoneLevel",
          value: "5",
          title: "Player Safe Zone Level",
          description: "If a player is less or equal this level he will create a safe zone (no enemies) when spawned.",
          label: "",
        },
        {
          component: "textField",
          key: "PlayerSafeZoneHours",
          value: "5",
          title: "Player Safe Zone Hours",
          description: "Hours in world time this safe zone exists.",
          label: "",
        },
        {
          component: "sliderTick",
          key: "BuildCreate",
          title: "Build Create",
          description: "Cheat mode on/off.",
          label: "",
          values: [
            'Disable',
            'Enable'
          ],
        },
        {
          component: "textField",
          key: "DayNightLength",
          value: "60",
          title: "Day Night Length",
          description: "Real time minutes per in game day: 60 minutes.",
          label: "",
        },
        {
          component: "textField",
          key: "DayLightLength",
          value: "18",
          title: "Day Light Length",
          description: "In game hours the sun shines per day: 18 hours day light per in game day.",
          label: "",
        },
        {
          component: "sliderTick",
          key: "DropOnDeath",
          title: "Drop On Death",
          description: "0 = nothing, 1 = everything, 2 = toolbelt only, 3 = backpack only, 4 = delete all.",
          label: "",
          values: [
            'Nothing',
            'Everything',
            'Toolbelt',
            'Backpack',
            'Delete all'
          ],
        },
        {
          component: "sliderTick",
          key: "DropOnQuit",
          title: "Drop On Quit",
          description: "0 = nothing, 1 = everything, 2 = toolbelt only, 3 = backpack only.",
          label: "",
          values: [
            'Nothing',
            'Everything',
            'Toolbelt',
            'Backpack'
          ],
        },
        {
          component: "textField",
          key: "BedrollDeadZoneSize",
          value: "15",
          title: "Bedroll Dead Zone Size",
          description: "Size(box radius), so a box with 2 times the given value for each side's length) of bedroll deadzone, no zombies will spawn inside this area, and any cleared sleeper volumes that touch a bedroll deadzone will not spawn after they've been cleared.",
          label: "",
        },
        {
          component: "textField",
          key: "BedrollExpiryTime",
          value: "45",
          title: "Bedroll Expiry Time",
          description: "Number of days a bedroll stays active after owner was last online.",
          label: "",
        },
        {
          component: "textField",
          key: "MaxSpawnedZombies",
          value: "64",
          title: "Max Spawned Zombies",
          description: "This setting covers the entire map. There can only be this many zombies on the entire map at one time. Changing this setting has a huge impact on performance.",
          label: "",
        },
        {
          component: "textField",
          key: "MaxSpawnedAnimals",
          value: "50",
          title: "Max Spawned Animals",
          description: "If your server has a large number of players you can increase this limit to add more wildlife. Animals don't consume as much CPU as zombies. NOTE: That this doesn't cause more animals to spawn arbitrarily: The biome spawning system only spawns a certain number of animals in a given area, but if you have lots of players that are all spread out then you may be hitting the limit and can increase it.",
          label: "",
        },
        {
          component: "textField",
          key: "ServerMaxAllowedViewDistance",
          value: "12",
          title: "Server Max Allowed View Distance",
          description: "Max view distance a client may request (6 - 12). High impact on memory usage and performance.",
          label: "",
        },
        {
          component: "sliderTick",
          key: "EnemySpawnMode",
          title: "Enemy Spawn Mode",
          description: "Enable/Disable enemy spawning.",
          label: "",
          values: [
            'Enable',
            'Disable'
          ],
        },
        {
          component: "sliderTick",
          key: "EnemyDifficulty",
          title: "Enemy Difficulty",
          description: "0 = Normal, 1 = Feral.",
          label: "",
          values: [
            'Normal',
            'Feral'
          ],
        },
        {
          component: "sliderTick",
          key: "ZombieMove",
          title: "Zombie Move",
          description: "0-4 (walk, jog, run, sprint, nightmare)",
          label: "",
          values: [
            'Walk',
            'Jog',
            'Run',
            'Sprint',
            'Nightmare'
          ],
        },
        {
          component: "sliderTick",
          key: "ZombieMoveNight",
          title: "Zombie Move Night",
          description: "0-4 (walk, jog, run, sprint, nightmare)",
          label: "",
          values: [
            'Walk',
            'Jog',
            'Run',
            'Sprint',
            'Nightmare'
          ],
        },
        {
          component: "sliderTick",
          key: "ZombieFeralMove",
          title: "Zombie Feral Move",
          description: "0-4 (walk, jog, run, sprint, nightmare)",
          label: "",
          values: [
            'Walk',
            'Jog',
            'Run',
            'Sprint',
            'Nightmare'
          ],
        },
        {
          component: "sliderTick",
          key: "ZombieBMMove",
          title: "Zombie BM Move",
          description: "0-4 (walk, jog, run, sprint, nightmare)",
          label: "",
          values: [
            'Walk',
            'Jog',
            'Run',
            'Sprint',
            'Nightmare'
          ],
        },
        {
          component: "textField",
          key: "BloodMoonFrequency",
          value: "7",
          title: "Blood Moon Frequency",
          description: "What frequency (in days) should a blood moon take place. Set to 0 for no blood moons.",
          label: "",
        },
        {
          component: "textField",
          key: "BloodMoonRange",
          value: "0",
          title: "Blood Moon Range",
          description: "How many days can the actual blood moon day randomly deviate from the above setting. Setting this to 0 makes blood moons happen exactly each Nth day as specified in BloodMoonFrequency.",
          label: "",
        },
        {
          component: "textField",
          key: "BloodMoonWarning",
          value: "8",
          title: "Blood Moon Warning",
          description: "The Hour number that the red day number begins on a blood moon day. Setting this to -1 makes the red never show.",
          label: "",
        },
        {
          component: "textField",
          key: "BloodMoonEnemyCount",
          value: "8",
          title: "Blood Moon Enemy Count",
          description: "This is the number of zombies that can be alive (spawned at the same time) at any time PER PLAYER during a blood moon horde, however, MaxSpawnedZombies overrides this number in multiplayer games. Also note that your game stage sets the max number of zombies PER PARTY. Low game stage values can result in lower number of zombies than the BloodMoonEnemyCount setting. Changing this setting has a huge impact on performance.",
          label: "",
        },
        {
          component: "textField",
          key: "LootAbundance",
          value: "100",
          title: "Loot Abundance",
          description: "percentage in whole number.",
          label: "",
        },
        {
          component: "textField",
          key: "LootRespawnDays",
          value: "30",
          title: "Loot Respawn Days",
          description: "Days in whole numbers.",
          label: "",
        },
        {
          component: "textField",
          key: "AirDropFrequency",
          value: "72",
          title: "Air Drop Frequency",
          description: "How often airdrop occur in game-hours, 0 == never.",
          label: "",
        },
        {
          component: "sliderTick",
          key: "AirDropMarker",
          title: "Air Drop Marker",
          description: "Sets if a marker is added to map/compass for air drops.",
          label: "",
          values: [
            'On',
            'Off'
          ],
        },
        {
          component: "textField",
          key: "PartySharedKillRange",
          value: "100",
          title: "Party Shared Kill Range",
          description: "The distance you must be within to receive party shared kill xp and quest party kill objective credit.",
          label: "",
        },
        {
          component: "sliderTick",
          key: "PlayerKillingMode",
          title: "Player Killing Mode",
          description: "Player Killing Settings (0 = No Killing, 1 = Kill Allies Only, 2 = Kill Strangers Only, 3 = Kill Everyone).",
          label: "",
          values: [
            'No',
            'Allies Only',
            'Strangers Only',
            'Everyone'
          ],
        },
        {
          component: "textField",
          key: "LandClaimCount",
          value: "1",
          title: "Land Claim Count",
          description: "Maximum allowed land claims per player.",
          label: "",
        },
        {
          component: "textField",
          key: "LandClaimSize",
          value: "41",
          title: "Land Claim Size",
          description: "Size in blocks that is protected by a keystone.",
          label: "",
        },
        {
          component: "textField",
          key: "LandClaimDeadZone",
          value: "30",
          title: "Land Claim Dead Zone",
          description: "Keystones must be this many blocks apart (unless you are friends with the other player).",
          label: "",
        },
        {
          component: "textField",
          key: "LandClaimExpiryTime",
          value: "7",
          title: "Land Claim Expiry Time",
          description: "The number of days a player can be offline before their claims expire and are no longer protected.",
          label: "",
        },
        {
          component: "sliderTick",
          key: "LandClaimDecayMode",
          title: "Land Claim Decay Mode",
          description: "Controls how offline players land claims decay. 0=Slow (Linear) , 1=Fast (Exponential), 2=None (Full protection until claim is expired).",
          label: "",
          values: [
            'Slow(Linear)',
            'Fast(Exponential)',
            'None',
          ],
        },
        {
          component: "textField",
          key: "LandClaimOnlineDurabilityModifier",
          value: "4",
          title: "Land Claim Online Durability Modifier",
          description: "How much protected claim area block hardness is increased when a player is online. 0 means infinite (no damage will ever be taken). Default is 4x.",
          label: "",
        },
        {
          component: "textField",
          key: "LandClaimOfflineDurabilityModifier",
          value: "4",
          title: "Land Claim Offline Durability Modifier",
          description: "How much protected claim area block hardness is increased when a player is offline. 0 means infinite (no damage will ever be taken). Default is 4x.",
          label: "",
        },
        {
          component: "textField",
          key: "LandClaimOfflineDelay",
          value: "0",
          title: "Land Claim Offline Delay",
          description: "The number of minutes after a player logs out that the land claim area hardness transitions from online to offline. Default is 0.",
          label: "",
        },
      ],
      defaultSettings: [
        {
          component: "textField",
          key: "GameWorld",
          value: "Navezgane",
          title: "Game World",
          description: "See WorldGenSeed and WorldGenSize options below) or any already existing world name in the Worlds folder (currently shipping with e.g. Navezgane, PREGEN01, ...)",
          label: ""
        },
        {
          component: "textField",
          key: "WorldGenSeed",
          value: "asdf",
          title: "World Gen Seed",
          description: "If RWG this is the seed for the generation of the new world. If a world with the resulting name already exists it will simply load it ",
          label: ""
        },
        {
          component: "textField",
          key: "WorldGenSize",
          value: "4096",
          title: "World Gen Size",
          description: "If RWG this controls the width and height of the created world. It is also used in combination with WorldGenSeed to create the internal RWG seed thus also creating a unique map name even if using the same WorldGenSeed. Has to be between 2048 and 16384, though large map sizes will take long to generate / download / load",
          label: ""
        },
        {
          component: "textField",
          key: "GameName",
          value: "My Game",
          title: "Game Name",
          description: "Whatever you want the game name to be. This affects the save game name as well as the seed used when placing decoration (trees etc) in the world. It does not control the generic layout of the world if creating an RWG world",
          label: ""
        },
        {
          component: "textField",
          key: "ServerName",
          title: "Server Name",
          description: "Whatever you want the name of the server to be.",
          label: ""
        },
        {
          component: "textField",
          key: "ServerDescription",
          title: "Server Description",
          description: "Whatever you want the server description to be, will be shown in the server browser.",
          label: ""
        },
        {
          component: "textField",
          key: "ServerPassword",
          title: "Server Password",
          description: "Password to gain entry to the server.",
          label: "",
          type: "password"
        },
        {
          component: "sliderTick",
          key: "ServerVisibility",
          title: "Server Visibility",
          description: "The visibility of this server.",
          label: "",
          values: [
            'Public',
            'Only Shown to Friends',
            'Not Listed'
          ],
        },
        {
          component: "textField",
          key: "ServerMaxPlayerCount",
          title: "Server Max Player Count",
          description: "Maximum Concurrent Players.",
          label: "",
        },
        {
          component: "sliderTick",
          key: "EACEnabled",
          title: "EAC Enabled",
          description: "Enables/Disables EasyAntiCheat",
          label: "",
          values: [
            'Disable',
            'Enable'
          ],
        },
        {
          component: "sliderTick",
          key: "GameDifficulty",
          title: "Game Difficulty",
          description: "0 - 5, 0=easiest, 5=hardest",
          label: "",
          values: [
            'Easiest',
            'Easy',
            'Normal',
            'Hard',
            'Hardest'
          ],
        },
        {
          component: "textField",
          key: "BlockDamagePlayer",
          value: "100",
          title: "Block Damage Player",
          description: "How much damage do players to blocks (percentage in whole numbers).",
          label: "",
        },
        {
          component: "textField",
          key: "BlockDamageAI",
          value: "100",
          title: "Block Damage AI",
          description: "How much damage do AIs to blocks (percentage in whole numbers).",
          label: "",
        },
        {
          component: "textField",
          key: "BlockDamageAIBM",
          value: "100",
          title: "Block Damage AIBM",
          description: "How much damage do AIs during blood moons to blocks (percentage in whole numbers).",
          label: "",
        },
        {
          component: "textField",
          key: "XPMultiplier",
          value: "100",
          title: "XP Multiplier",
          description: "XP gain multiplier (percentage in whole numbers).",
          label: "",
        },
        {
          component: "textField",
          key: "PlayerSafeZoneLevel",
          value: "5",
          title: "Player Safe Zone Level",
          description: "If a player is less or equal this level he will create a safe zone (no enemies) when spawned.",
          label: "",
        },
        {
          component: "textField",
          key: "PlayerSafeZoneHours",
          value: "5",
          title: "Player Safe Zone Hours",
          description: "Hours in world time this safe zone exists.",
          label: "",
        },
        {
          component: "sliderTick",
          key: "BuildCreate",
          title: "Build Create",
          description: "Cheat mode on/off.",
          label: "",
          values: [
            'Disable',
            'Enable'
          ],
        },
        {
          component: "textField",
          key: "DayNightLength",
          value: "60",
          title: "Day Night Length",
          description: "Real time minutes per in game day: 60 minutes.",
          label: "",
        },
        {
          component: "textField",
          key: "DayLightLength",
          value: "18",
          title: "Day Light Length",
          description: "In game hours the sun shines per day: 18 hours day light per in game day.",
          label: "",
        },
        {
          component: "sliderTick",
          key: "DropOnDeath",
          title: "Drop On Death",
          description: "0 = nothing, 1 = everything, 2 = toolbelt only, 3 = backpack only, 4 = delete all.",
          label: "",
          values: [
            'Nothing',
            'Everything',
            'Toolbelt',
            'Backpack',
            'Delete all'
          ],
        },
        {
          component: "sliderTick",
          key: "DropOnQuit",
          title: "Drop On Quit",
          description: "0 = nothing, 1 = everything, 2 = toolbelt only, 3 = backpack only.",
          label: "",
          values: [
            'Nothing',
            'Everything',
            'Toolbelt',
            'Backpack'
          ],
        },
        {
          component: "textField",
          key: "BedrollDeadZoneSize",
          value: "15",
          title: "Bedroll Dead Zone Size",
          description: "Size(box radius), so a box with 2 times the given value for each side's length) of bedroll deadzone, no zombies will spawn inside this area, and any cleared sleeper volumes that touch a bedroll deadzone will not spawn after they've been cleared.",
          label: "",
        },
        {
          component: "textField",
          key: "BedrollExpiryTime",
          value: "45",
          title: "Bedroll Expiry Time",
          description: "Number of days a bedroll stays active after owner was last online.",
          label: "",
        },
        {
          component: "textField",
          key: "MaxSpawnedZombies",
          value: "64",
          title: "Max Spawned Zombies",
          description: "This setting covers the entire map. There can only be this many zombies on the entire map at one time. Changing this setting has a huge impact on performance.",
          label: "",
        },
        {
          component: "textField",
          key: "MaxSpawnedAnimals",
          value: "50",
          title: "Max Spawned Animals",
          description: "If your server has a large number of players you can increase this limit to add more wildlife. Animals don't consume as much CPU as zombies. NOTE: That this doesn't cause more animals to spawn arbitrarily: The biome spawning system only spawns a certain number of animals in a given area, but if you have lots of players that are all spread out then you may be hitting the limit and can increase it.",
          label: "",
        },
        {
          component: "textField",
          key: "ServerMaxAllowedViewDistance",
          value: "12",
          title: "Server Max Allowed View Distance",
          description: "Max view distance a client may request (6 - 12). High impact on memory usage and performance.",
          label: "",
        },
        {
          component: "sliderTick",
          key: "EnemySpawnMode",
          title: "Enemy Spawn Mode",
          description: "Enable/Disable enemy spawning.",
          label: "",
          values: [
            'Enable',
            'Disable'
          ],
        },
        {
          component: "sliderTick",
          key: "EnemyDifficulty",
          title: "Enemy Difficulty",
          description: "0 = Normal, 1 = Feral.",
          label: "",
          values: [
            'Normal',
            'Feral'
          ],
        },
        {
          component: "sliderTick",
          key: "ZombieMove",
          title: "Zombie Move",
          description: "0-4 (walk, jog, run, sprint, nightmare)",
          label: "",
          values: [
            'Walk',
            'Jog',
            'Run',
            'Sprint',
            'Nightmare'
          ],
        },
        {
          component: "sliderTick",
          key: "ZombieMoveNight",
          title: "Zombie Move Night",
          description: "0-4 (walk, jog, run, sprint, nightmare)",
          label: "",
          values: [
            'Walk',
            'Jog',
            'Run',
            'Sprint',
            'Nightmare'
          ],
        },
        {
          component: "sliderTick",
          key: "ZombieFeralMove",
          title: "Zombie Feral Move",
          description: "0-4 (walk, jog, run, sprint, nightmare)",
          label: "",
          values: [
            'Walk',
            'Jog',
            'Run',
            'Sprint',
            'Nightmare'
          ],
        },
        {
          component: "sliderTick",
          key: "ZombieBMMove",
          title: "Zombie BM Move",
          description: "0-4 (walk, jog, run, sprint, nightmare)",
          label: "",
          values: [
            'Walk',
            'Jog',
            'Run',
            'Sprint',
            'Nightmare'
          ],
        },
        {
          component: "textField",
          key: "BloodMoonFrequency",
          value: "7",
          title: "Blood Moon Frequency",
          description: "What frequency (in days) should a blood moon take place. Set to 0 for no blood moons.",
          label: "",
        },
        {
          component: "textField",
          key: "BloodMoonRange",
          value: "0",
          title: "Blood Moon Range",
          description: "How many days can the actual blood moon day randomly deviate from the above setting. Setting this to 0 makes blood moons happen exactly each Nth day as specified in BloodMoonFrequency.",
          label: "",
        },
        {
          component: "textField",
          key: "BloodMoonWarning",
          value: "8",
          title: "Blood Moon Warning",
          description: "The Hour number that the red day number begins on a blood moon day. Setting this to -1 makes the red never show.",
          label: "",
        },
        {
          component: "textField",
          key: "BloodMoonEnemyCount",
          value: "8",
          title: "Blood Moon Enemy Count",
          description: "This is the number of zombies that can be alive (spawned at the same time) at any time PER PLAYER during a blood moon horde, however, MaxSpawnedZombies overrides this number in multiplayer games. Also note that your game stage sets the max number of zombies PER PARTY. Low game stage values can result in lower number of zombies than the BloodMoonEnemyCount setting. Changing this setting has a huge impact on performance.",
          label: "",
        },
        {
          component: "textField",
          key: "LootAbundance",
          value: "100",
          title: "Loot Abundance",
          description: "percentage in whole number.",
          label: "",
        },
        {
          component: "textField",
          key: "LootRespawnDays",
          value: "30",
          title: "Loot Respawn Days",
          description: "Days in whole numbers.",
          label: "",
        },
        {
          component: "textField",
          key: "AirDropFrequency",
          value: "72",
          title: "Air Drop Frequency",
          description: "How often airdrop occur in game-hours, 0 == never.",
          label: "",
        },
        {
          component: "sliderTick",
          key: "AirDropMarker",
          title: "Air Drop Marker",
          description: "Sets if a marker is added to map/compass for air drops.",
          label: "",
          values: [
            'On',
            'Off'
          ],
        },
        {
          component: "textField",
          key: "PartySharedKillRange",
          value: "100",
          title: "Party Shared Kill Range",
          description: "The distance you must be within to receive party shared kill xp and quest party kill objective credit.",
          label: "",
        },
        {
          component: "sliderTick",
          key: "PlayerKillingMode",
          title: "Player Killing Mode",
          description: "Player Killing Settings (0 = No Killing, 1 = Kill Allies Only, 2 = Kill Strangers Only, 3 = Kill Everyone).",
          label: "",
          values: [
            'No',
            'Allies Only',
            'Strangers Only',
            'Everyone'
          ],
        },
        {
          component: "textField",
          key: "LandClaimCount",
          value: "1",
          title: "Land Claim Count",
          description: "Maximum allowed land claims per player.",
          label: "",
        },
        {
          component: "textField",
          key: "LandClaimSize",
          value: "41",
          title: "Land Claim Size",
          description: "Size in blocks that is protected by a keystone.",
          label: "",
        },
        {
          component: "textField",
          key: "LandClaimDeadZone",
          value: "30",
          title: "Land Claim Dead Zone",
          description: "Keystones must be this many blocks apart (unless you are friends with the other player).",
          label: "",
        },
        {
          component: "textField",
          key: "LandClaimExpiryTime",
          value: "7",
          title: "Land Claim Expiry Time",
          description: "The number of days a player can be offline before their claims expire and are no longer protected.",
          label: "",
        },
        {
          component: "sliderTick",
          key: "LandClaimDecayMode",
          title: "Land Claim Decay Mode",
          description: "Controls how offline players land claims decay. 0=Slow (Linear) , 1=Fast (Exponential), 2=None (Full protection until claim is expired).",
          label: "",
          values: [
            'Slow(Linear)',
            'Fast(Exponential)',
            'None',
          ],
        },
        {
          component: "textField",
          key: "LandClaimOnlineDurabilityModifier",
          value: "4",
          title: "Land Claim Online Durability Modifier",
          description: "How much protected claim area block hardness is increased when a player is online. 0 means infinite (no damage will ever be taken). Default is 4x.",
          label: "",
        },
        {
          component: "textField",
          key: "LandClaimOfflineDurabilityModifier",
          value: "4",
          title: "Land Claim Offline Durability Modifier",
          description: "How much protected claim area block hardness is increased when a player is offline. 0 means infinite (no damage will ever be taken). Default is 4x.",
          label: "",
        },
        {
          component: "textField",
          key: "LandClaimOfflineDelay",
          value: "0",
          title: "Land Claim Offline Delay",
          description: "The number of minutes after a player logs out that the land claim area hardness transitions from online to offline. Default is 0.",
          label: "",
        },
      ],
      changedSettings: [],
      tabs: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
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
