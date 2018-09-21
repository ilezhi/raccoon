export const getRouterData = (state: any) => {
  let route = state.root

  while (route.firstChild) {
    route = route.firstChild
  }

  return route.data
}
