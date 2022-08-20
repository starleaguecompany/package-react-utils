let previousStyle: {
  overflow: string
  position: string
  width: string
}

// let previousPaddingRight: string

export function preventBodyScroll(preventScroll?: boolean) {
  // const { width } = document.body.getBoundingClientRect()

  /** Apply or remove style to prevent body scroll */
  if (preventScroll) {
    previousStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      width: document.body.style.width,
    }
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100vw'
  } else {
    document.body.style.overflow = previousStyle.overflow || ''
    document.body.style.position = previousStyle.position || ''
    document.body.style.width = previousStyle.width || ''
  }

  /** Get the _new width_ of the body (this will tell us the scrollbar width) */
  // const newWidth = document.body.getBoundingClientRect().width
  // const scrollBarWidth = newWidth - width

  /** If there's a diff due to scrollbars, then account for it with padding */
  // if (preventScroll) {
  //   previousPaddingRight = document.body.style.paddingRight
  //   document.body.style.paddingRight = Math.max(0, scrollBarWidth || 0) + 'px'
  // } else {
  //   document.body.style.paddingRight = previousPaddingRight || ''
  // }
}
