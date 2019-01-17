export const append = (source: number[], id: number, mode = true): number[] => {
  let ids = [...source]
  const i = ids.indexOf(id)

  if (i !== -1) {
    ids.splice(i, 1)
  }

  if (mode) {
    ids.unshift(id)
  }

  return ids
}
