export const getRouterData = (state: any) => {
  let route = state.root

  while (route.firstChild) {
    route = route.firstChild
  }

  return route.data
}

export const getPageTopics = (topics: KeyMap, state: PageState): Array<Topic> => {
  if (!state) {
    return
  }

  const { page, size, ids } = state
  const end = page * size
  const start = end - size
  const data: any = ids.slice(start, end).map(id => topics[id])    

  return data
}
