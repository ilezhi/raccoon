export const getPageTopics = (topics: KeyMap, state: PageState): Array<Topic> => {
  if (!state) {
    return
  }

  const data: any = state.ids.map(id => topics[id])    

  return data
}
