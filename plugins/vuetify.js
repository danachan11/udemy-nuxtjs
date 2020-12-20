import Vue from 'vue'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default ctx => {
  const vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#f44336',
          secondary: '#9368e9',
        },
        dark: {
          // colors
        }
      }
    }
  })
  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
