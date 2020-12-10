const bodyParser = require("body-parser");
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "My Blog",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Dynamically meta tag soon"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Open+Sans"
      }
    ]
  },

  loading: {
    color: "#333019",
    height: "4px",
    duration: 5000
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~assets/styles/main.css"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["~plugins/core-components.js", "~plugins/date-filter.js"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build"
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/axios"],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  env: {
    baseUrl:
      process.env.BASE_URL ||
      "https://udemy-test-2d952-default-rtdb.firebaseio.com",
    firebaseAPI: "AIzaSyByBdECKuk3COE0dxeNZ1ljdyusY925yPA"
  },
  generate: {},
  transition: {
    name: "fade",
    mode: "out-in"
  },
  axios: {
    baseURL:
      process.env.BASE_URL ||
      "https://udemy-test-2d952-default-rtdb.firebaseio.com",
    credentials: false
  },
  router: {
    middleware: "log"
  },
  serverMiddleware: [bodyParser.json(), "~/api"]
};
