import Vuex from "vuex";
import Cookie from "js-cookie";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: ""
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
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = "";
      }
    },
    actions: {
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

      login(vuexContext, params) {

        console.log(`store ${params.email} ${params.password}`)

        return this.$axios
          .$post("/api/login/", {"email": params.email, "password": params.password})
          .then(response => {
            const token = response.access_token
            vuexContext.commit("setToken", token);
            localStorage.setItem("token", token);
            Cookie.set("jwt", token);
          })
          .catch(e => {
            console.log(e);
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
        var token = "";
        var expirationDate = "";
        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split("=")[1];
          const expirationDateCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("tokenExpiration="));
          if (!expirationDateCookie) {
            return;
          }
          expirationDate = expirationDateCookie.split("=")[1];
        } else {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        }
        if (new Date().getTime() > +expirationDate || token === "") {
          vuexContext.dispatch("signout");
          return;
        }
        vuexContext.commit("setToken", token);
      },
      signout(vuexContext) {
        Cookie.remove("token");
        Cookie.remove("tokenExpiration");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
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
