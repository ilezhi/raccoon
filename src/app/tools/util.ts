export const getPageTopics = (topics: KeyMap, state: PageState): Array<Topic> => {
  if (!state) {
    return
  }

  const data: any = state.ids.map(id => topics[id])    

  return data
}

export const getNodeCount = (nodes: Array<any>, children: string, count: number = 0): number => {
  if (!Array.isArray(nodes)) {
    return 0
  }

  const len = nodes.length
  if (len === 0) {
    return len
  }

  for (let i = 0; i < len; i++) {
    count += 1
    const data = nodes[i][children]

    if (data) {
      count += getNodeCount(data, children, count)
    }
  }
  return count
}
