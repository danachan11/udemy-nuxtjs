export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "7 Days to Die Dedicated Server Hosting",
    meta: [
      {charset: "utf-8"},
      {name: "viewport", content: "width=device-width, initial-scale=1"},
      {
        hid: "description",
        name: "description",
        content: "Get 7 Days to Die(7dtd) one day free trial now, just sign up no credit card info needed."
      }
    ],
    link: [
      {rel: "icon", type: "image/x-icon", href: "/favicon.ico"},
      {
        rel: "stylesheet",
        // href: "https://fonts.googleapis.com/css2?family=Ubuntu"
        href: "https://fonts.googleapis.com/css2?family=B612&display=swap"
      }
    ]
  },
  server: {
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, "servers.key")),
    //   cert: fs.readFileSync(path.resolve(__dirname, "servers.crt")),
    //   ca: fs.readFileSync(
    //     path.resolve(__dirname, "www_7dtdserver_com.ca-bundle")
    //   )
    // },
    port: process.env.PORT,
    host: process.env.HOST,
    timing: false
  },
  loading: {
    color: "#333019",
    height: "4px",
    duration: 5000
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~assets/styles/main.css"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "~plugins/core-components.js", "~plugins/date-filter.js", '~plugins/vuetify.js',
    { src: '~plugins/ga.js', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "@nuxtjs/vuetify",
    '@nuxtjs/google-analytics'
  ],
  googleAnalytics: {
    // Options
    id: "G-NCWH29RJRQ"
  },
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/axios", "@nuxtjs/proxy"],

  // proxy: {
  //   "/start_server": {
  //     target: "https://7dtdserver.com/api/copy",
  //     pathRewrite: {
  //       "^/start_server": ""
  //     }
  //   },
  //   "/setup_server": {
  //     target: "https://7dtdserver.com/api/setup_server",
  //     pathRewrite: {
  //       "^/setup_server": ""
  //     }
  //   },
  //   "/signup": {
  //     target: "https://7dtdserver.com/api/signup",
  //     pathRewrite: {
  //       "^/signup": ""
  //     }
  //   },
  //   "/api/login": {
  //     target: "https://7dtdserver.com/api/login",
  //     pathRewrite: {
  //       "^/api/login": ""
  //     }
  //   },
  //   "/api/users/get_servers": {
  //     target: "https://7dtdserver.com/api/users/get_servers",
  //     pathRewrite: {
  //       "^/api/users/get_servers": ""
  //     }
  //   },
  //   "/api/users/get_config": {
  //     target: "https://7dtdserver.com/api/users/get_config",
  //     pathRewrite: {
  //       "^/api/users/get_config": ""
  //     }
  //   },
  //   "/api/users/set_config": {
  //     target: "https://7dtdserver.com/api/users/set_config",
  //     pathRewrite: {
  //       "^/api/users/set_config": ""
  //     }
  //   }
  // },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  // env: {
  //   baseUrl:
  //     process.env.BASE_URL ||
  //     "https://udemy-test-2d952-default-rtdb.firebaseio.com",
  //   firebaseAPI: "AIzaSyByBdECKuk3COE0dxeNZ1ljdyusY925yPA"
  // },
  generate: {},
  transition: {
    name: "fade",
    mode: "out-in"
  },
  axios: {
    baseURL:
      process.env.BASE_URL || "http://127.0.0.1",
    credentials: false,
    https: process.env.HTTPS || false

  },
  // router: {
  //   middleware: "log"
  // }
  // serverMiddleware: [
  //   // Will register redirect-ssl npm package
  //   "redirect-ssl"
  // ]
};
