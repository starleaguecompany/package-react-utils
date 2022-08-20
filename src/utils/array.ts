export function getFirstItem<T>(array: T[]): T | undefined {
  return array != null && array.length ? array[0] : undefined
}

export function getLastItem<T>(array: T[]): T | undefined {
  const length = array == null ? 0 : array.length
  return length ? array[length - 1] : undefined
}

export function getPrevItem<T>(index: number, array: T[], loop = true): T {
  const prevIndex = getPrevIndex(index, array.length, loop)
  return array[prevIndex]
}

export function getNextItem<T>(index: number, array: T[], loop = true): T {
  const nextIndex = getNextIndex(index, array.length, 1, loop)
  return array[nextIndex]
}

export function findIndex<T>(array: T[], item: T): number {
  return array.indexOf(item)
}

export function removeIndex<T>(array: T[], index: number): T[] {
  return array.filter((_, idx) => idx !== index)
}

export function addItem<T>(array: T[], item: T): T[] {
  return [...array, item]
}

export function removeItem<T>(array: T[], item: T): T[] {
  return array.filter(eachItem => eachItem !== item)
}

/**
 * Get the next index based on the current index and step.
 *
 * @param currentIndex the current index
 * @param length the total length or count of items
 * @param step the number of steps
 * @param loop whether to circle back once `currentIndex` is at the start/end
 */
export function getNextIndex(currentIndex: number, length: number, step = 1, loop = true): number {
  const lastIndex = length - 1

  if (currentIndex === -1) {
    return step > 0 ? 0 : lastIndex
  }

  const nextIndex = currentIndex + step

  if (nextIndex < 0) {
    return loop ? lastIndex : 0
  }

  if (nextIndex >= length) {
    if (loop) return 0
    return currentIndex > length ? length : currentIndex
  }

  return nextIndex
}

/**
 * Get's the previous index based on the current index.
 * Mostly used for keyboard navigation.
 *
 * @param currentIndex - the current index
 * @param count - the length or total count of items in the array
 * @param loop - whether we should circle back to the
 * first/last once `currentIndex` is at the start/end
 */
export function getPrevIndex(currentIndex: number, count: number, loop = true): number {
  return getNextIndex(currentIndex, count, -1, loop)
}
