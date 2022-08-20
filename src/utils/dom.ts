export function getOwnerWindow(node?: HTMLElement | null): Window {
  return node instanceof Element ? getOwnerDocument(node)?.defaultView ?? window : window
}

export function getOwnerDocument(node?: HTMLElement | null): Document {
  return node instanceof Element ? node.ownerDocument ?? document : document
}

export function dom(): boolean {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement)
}

export const isBrowser = dom()
