export default function(context) {
  context.store.dispatch('setAppbarItems')
  console.log("Middleware logging...");
}
