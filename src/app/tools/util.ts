export const getPageTopics = (topics: KeyMap, state: PageState, top: PageState): PageState => {
  if (!state || !topics) {
    return
  }

  let ids = state.ids

  if (top) {
    ids = top.ids.concat(ids)
  }

  const data: any = ids.map(id => topics[id])
  return {
    ...state,
    data
  }
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
    const data = nodes[i][children]

    if (data) {
      count += getNodeCount(data, children, count)
    }
    count += 1
  }

  return count
}

export const storage = (key: string, val?: any): any => {
  const sess = window.sessionStorage
  if (!val) {
    try {
      val = JSON.parse(sess.getItem(key))
    } catch (err) {
      console.error('解析成json格式失败')
      return
    }

    return val
  }

  sess.setItem(key, JSON.stringify(val))
}

export const clearStorage = (key: string): void => {
  window.sessionStorage.removeItem(key)
}

export const toFirstUpperCase = (str: string): string => {
  str = 'on' + str.replace(/^\S/, s => s.toUpperCase())
  return str
}
