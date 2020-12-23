export default function(context) {
  console.log(`fuuuuuuuuucking auth.js`)
  if (!context.store.getters.isAuthenticated) {
    context.redirect("/auth");
  }
}
