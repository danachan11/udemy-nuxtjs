<template>
  <v-row>
    <v-col cols="12" sm="7" class="mt-n2 mb-n2">
      <div>
        <h1>{{ title }}</h1>
        <h4 class="mt-2 ml-4">{{ description }}</h4>
      </div>
    </v-col>
    <v-col cols="12" sm="5">
      <v-slider
        :tick-labels="values"
        :value="value"
        min="0"
        :max="values.length - 1"
        color="success"
        track-color="#cdcdcd"
        ticks="always"
        tick-size="3"
        @change="onValueChange"
      >
        <template v-slot:thumb-label="props">
          <v-icon dark>
            {{ season(props.value) }}
          </v-icon>
        </template>
      </v-slider>
    </v-col>
    <v-col cols="12" sm="12" class="mt-n2 mb-n2">
      <v-divider inset class="primary"></v-divider>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    componentKey: {
      type: String,
      required: true
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: false
    },
    label: {
      type: String,
      default: ""
    },
    values: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      icons: [
        'mdi-snowflake',
        'mdi-leaf',
        'mdi-fire'
      ],
    }
  },
  methods: {
    onValueChange(changedValue) {
      const setting = {
        component: "sliderTick",
        key: this.componentKey,
        title: this.title,
        description: this.description,
        label: this.label,
        values: this.values,
        value: changedValue,
        isChanged: true
      }
      this.$emit('sliderValueChanged', setting)
    },
    season(val) {
      return this.icons[val]
    },
  },
}
</script>
