import Vuex from "vuex";
import Cookie from "js-cookie";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: "",
      appbarItems: [],
      authorizedAppbarItems: [
        {name: 'Home', to: "/"},
        {name: "Servers", to: "/servers"},
        {name: "Logout", to: "/logout"}
      ],
      unauthorizedAppbarItems: [
        {name: 'Home', to: "/"},
        {name: "Login", to: "/login"}
      ]
    },
    mutations: {
      // setPosts(state, posts) {
      //   state.loadedPosts = posts;
      // },
      // addPost(state, post) {
      //   state.loadedPosts.push(post);
      // },
      // editPost(state, edittedPost) {
      //   const postIndex = state.loadedPosts.findIndex(
      //     post => post.id === edittedPost.id
      //   );
      //   state.loadedPosts[postIndex] = edittedPost;
      // },
      setAuthorizedAppbar(state) {
        state.appbarItems = state.authorizedAppbarItems
      },
      setUnauthorizedAppbar(state) {
        state.appbarItems = state.unauthorizedAppbarItems
      },
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = "";
      }
    },
    actions: {
      setAppbarItems(vuexContext) {
        if (vuexContext.getters.isAuthenticated) {
          vuexContext.commit('setAuthorizedAppbar')
        } else {
          vuexContext.commit('setUnauthorizedAppbar')
        }
      },
      setupServer() {
        return this.$axios.$post("/setup_server/", {"id": "1234", "token": "token1234"});
      },
      startServer(vuexContext) {
        return this.$axios.$post("/start_server/", {"id": "1234", "token": "token1234"});
      },
      signup(vuexContext, email, password) {
        return this.$axios
          .$post("/signup/", {"email": email, "password": password})
          .then(response => {
            console.log(`sign up response ${response}`)
            // const expiresInSeconds = result.expiresIn * 1000;
            // const expirationDate = new Date().getTime() + +expiresInSeconds;
            // const token = result.idToken;
            // vuexContext.commit("setToken", token);
            // localStorage.setItem("token", token);
            // localStorage.setItem("tokenExpiration", expirationDate);
            // Cookie.set("jwt", token);
            // Cookie.set("tokenExpiration", expirationDate);
          })
          .catch(e => {
            console.log(e);
          });
      },
      saveSettings(vuexContext, params) {
        const token = vuexContext.state.token
        return this.$axios
          .$put(this.$axios.defaults.baseURL + "/api/users/set_config", params,
            {headers: {Authorization: `Bearer ${token}`}})
          .then(response => {
          })
          .catch(e => {
            console.log(e);
          });
      },
      newServer(vuexContext, params) {
        const token = vuexContext.state.token
        return this.$axios
          .$post(this.$axios.defaults.baseURL + "/api/users/start_server", params,
            {headers: {Authorization: `Bearer ${token}`}})
          .then(response => {

          })
          .catch(e => {
            console.log(e);
          });
      },
      login(vuexContext, params) {
        console.log(`fucking axios ${this.$axios.defaults.baseURL}`)
        return this.$axios
          .$post(this.$axios.defaults.baseURL + "/api/login/", {"email": params.email, "password": params.password})
          .then(response => {
            const token = response.access_token
            vuexContext.commit("setToken", token);
            localStorage.setItem("token", token);
            Cookie.set("jwt", token);
            return "success"
          })
          .catch(e => {
            throw e
          });
      },
      nuxtServerInit(vuexContext, context) {
        // return context.app.$axios
        //   .$get("/posts.json")
        //   .then(data => {
        //     const posts = [];
        //     for (const key in data) {
        //       posts.push({ ...data[key], id: key });
        //     }
        //     vuexContext.commit("setPosts", posts);
        //   })
        //   .catch(e => {
        //     console.log(e);
        //     context.error(e);
        //   });
      },
      // setPosts(vuexContext, posts) {
      //   vuexContext.commit("setPosts", posts);
      // },
      // addPost(vuexContext, post) {
      //   const createdPost = { ...post, updatedDate: new Date() };
      //   return this.$axios
      //     .$post("/posts.json?auth=" + vuexContext.state.token, createdPost)
      //     .then(data => {
      //       vuexContext.commit("addPost", {
      //         ...createdPost,
      //         id: data.name
      //       });
      //     });
      // },
      // editPost(vuexContext, edittedPost) {
      //   return this.$axios
      //     .$put(
      //       "/posts/" +
      //         edittedPost.id +
      //         ".json?auth=" +
      //         vuexContext.state.token,
      //       edittedPost
      //     )
      //     .then(data => {
      //       vuexContext.commit("editPost", data);
      //     })
      //     .catch(e => {
      //       console.log(e);
      //     });
      // },
      initAuth(vuexContext, req) {
        let token = "";
        let expirationDate = "";
        if (req) {
          if (!req.headers.cookie) {
            vuexContext.dispatch("signout");
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));
          if (!jwtCookie) {
            vuexContext.dispatch("signout");
            return;
          }
          token = jwtCookie.split("=")[1];
          // const expirationDateCookie = req.headers.cookie
          //   .split(";")
          //   .find(c => c.trim().startsWith("tokenExpiration="));
          // if (!expirationDateCookie) {
          //   return;
          // }
          // expirationDate = expirationDateCookie.split("=")[1];
        } else {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        }

        if (token === "" || !token) {
          vuexContext.dispatch("signout");
          return;
        }

        // if (new Date().getTime() > +expirationDate || token === "") {
        //   vuexContext.dispatch("signout");
        //   return;
        // }
        vuexContext.commit("setToken", token);
      },
      signout(vuexContext) {
        Cookie.remove("jwt");
        if (process.client) {
          localStorage.removeItem("token");
        }
        vuexContext.commit("clearToken");
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthenticated(state) {
        return state.token != "";
      }
    }
  });
};

export default createStore;
