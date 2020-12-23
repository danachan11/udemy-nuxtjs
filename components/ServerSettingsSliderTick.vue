<template>
  <v-row v-show="show">
    <v-col cols="12" sm="7" class="mt-n2 mb-n2">
      <div>
        <h1>{{ title }}</h1>
        <h4 class="mt-2 ml-4">{{ description }}</h4>
      </div>
    </v-col>
    <v-col cols="12" sm="5">
      <v-slider
        :tick-labels="values"
        :value="valueN"
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
    show: {
      type: Boolean,
      default: true
    },
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
      type: String,
      default: 0
    },
    isTrueFalseValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      icons: [
        'mdi-snowflake',
        'mdi-leaf',
        'mdi-fire'
      ],
      valueN: ""
    }
  },
  methods: {
    onValueChange(changedValue) {

      let newChangedValue = changedValue
      console.log(`my changed value ${changedValue}`)
      console.log(`I am is true false ${this.isTrueFalseValue}`)
      if(this.isTrueFalseValue){
        if(newChangedValue === 1){
          newChangedValue = "true"
        }
        else{
          newChangedValue = "false"
        }
      }else{
        newChangedValue = changedValue.toString()
      }
      console.log(`my newwwwwwwwwwwww changed value ${newChangedValue}`)

      const setting = {
        component: "sliderTick",
        key: this.componentKey,
        title: this.title,
        description: this.description,
        label: this.label,
        values: this.values,
        value: newChangedValue,
        isChanged: true,
        isTrueFalse: this.isTrueFalseValue
      }
      this.$emit('sliderValueChanged', setting)
    },
    season(val) {
      return this.icons[val]
    },
  },
  mounted() {
    if(this.isTrueFalseValue){
      console.log(`i am true false ${this.title}`)
      if(this.value === "true")
        this.valueN = "1"
      else
        this.valueN = "0"
    }else{
      this.valueN = this.value
    }
  }
}
</script>
