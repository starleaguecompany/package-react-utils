import * as React from 'react'
import { createPopper, Instance, Modifier, Placement, VirtualElement } from '@popperjs/core'

import { noop, mergeRefs } from '../utils'

export interface Props {
  /**
   * Whether the popper.js should be enabled
   */
  enabled?: boolean
  /**
   * The main and cross-axis offset to displace popper element
   * from its reference element.
   */
  offset?: [crossAxis: number, mainAxis: number]
  /**
   * The distance or margin between the reference and popper.
   * It is used internally to create an `offset` modifier.
   *
   * NB: If you define `offset` prop, it'll override the gutter.
   * @default 8
   */
  gutter?: number
  /**
   * If `true`, will prevent the popper from being cut off and ensure
   * it's visible within the boundary area.
   * @default true
   */
  preventOverflow?: boolean
  /**
   * If `true`, the popper will change its placement and flip when it's
   * about to overflow its boundary area.
   * @default true
   */
  flip?: boolean
  /**
   * If `true`, the popper will match the width of the reference at all times.
   * If `false`, the popper will match the width of the reference or width of
   * the content if it is wider than reference width. It's useful for `autocomplete`,
   * `select`, etc. components in Control Group.
   * @default false
   */
  matchWidth?: boolean
  /**
   * The boundary area for the popper. Used within the `preventOverflow` modifier
   * @default "clippingParents"
   */
  boundary?: 'clippingParents' | 'scrollParent' | HTMLElement
  /**
   * If provided, determines whether the popper will reposition itself on `scroll`
   * and `resize` of the window.
   */
  eventListeners?: boolean | { scroll?: boolean; resize?: boolean }
  /**
   * The padding required to prevent the arrow from
   * reaching the very edge of the popper.
   * @default 8
   */
  arrowPadding?: number
  /**
   * The CSS positioning strategy to use.
   * @default "absolute"
   */
  strategy?: 'absolute' | 'fixed'
  /**
   * The placement of the popper relative to its reference.
   * @default "bottom"
   */
  placement?: Placement
  /**
   * Array of popper.js modifiers. Check the docs to see
   * the list of possible modifiers you can pass.
   *
   * @see Docs https://popper.js.org/docs/v2/modifiers/
   */
  modifiers?: Array<Partial<Modifier<string, any>>>
}

const transforms = {
  top: 'bottom center',
  'top-start': 'bottom left',
  'top-end': 'bottom right',

  bottom: 'top center',
  'bottom-start': 'top left',
  'bottom-end': 'top right',

  left: 'right center',
  // "left-start": "right top",
  // "left-end": "right bottom",

  right: 'left center',
  // "right-start": "left top",
  // "right-end": "left bottom",
}

// @ts-ignore
export const toTransformOrigin = (placement: Partial<Placement>) => transforms[placement]

const defaultEventListeners = {
  scroll: true,
  resize: true,
}

export function getEventListenerOptions(value?: boolean | Partial<typeof defaultEventListeners>) {
  let eventListeners: {
    enabled?: boolean
    options?: typeof defaultEventListeners
  }
  if (typeof value === 'object') {
    eventListeners = {
      enabled: true,
      options: { ...defaultEventListeners, ...value },
    }
  } else {
    eventListeners = {
      enabled: value,
      options: defaultEventListeners,
    }
  }
  return eventListeners
}

export const matchWidthModifier: Modifier<'matchWidth', any> = {
  name: 'matchWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`
  },
  effect:
    ({ state }) =>
    () => {
      const reference = state.elements.reference as HTMLElement
      state.elements.popper.style.width = `${reference.offsetWidth}px`
    },
}

export const matchMinWidthModifier: Modifier<'matchMinWidth', any> = {
  name: 'matchMinWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }) => {
    state.styles.popper.minWidth = `${state.rects.reference.width}px`
  },
  effect:
    ({ state }) =>
    () => {
      const reference = state.elements.reference as HTMLElement
      state.elements.popper.style.minWidth = `${reference.offsetWidth}px`
    },
}

export function usePositioner(props: Props = {}) {
  const {
    enabled = true,
    modifiers = [],
    placement: placementProp = 'top',
    strategy = 'absolute',
    arrowPadding = 8,
    eventListeners = true,
    offset,
    gutter = 8,
    flip = true,
    boundary = 'clippingParents',
    preventOverflow = true,
    matchWidth = false,
  } = props

  const reference = React.useRef<Element | VirtualElement | null>(null)
  const popper = React.useRef<HTMLElement | null>(null)
  const arrow = React.useRef<HTMLElement | null>(null)
  const instance = React.useRef<Instance | null>(null)

  const cleanup = React.useRef(noop)

  const setupPopper = React.useCallback(() => {
    if (!enabled || !reference.current || !popper.current) return

    // If popper instance exists, destroy it so we can create a new one
    cleanup.current?.()

    instance.current = createPopper(reference.current, popper.current, {
      placement: placementProp,
      modifiers: [
        { ...matchWidthModifier, enabled: !!matchWidth },
        { ...matchMinWidthModifier, enabled: !matchWidth },
        // {
        //   name: "eventListeners",
        //   ...getEventListenerOptions(eventListeners),
        // },
        {
          name: 'arrow',
          options: {
            element: arrow.current,
            padding: arrowPadding,
          },
        },
        {
          name: 'offset',
          options: {
            offset: offset || [0, gutter],
          },
        },
        {
          name: 'flip',
          enabled: !!flip,
          options: { padding: 8 },
        },
        {
          name: 'preventOverflow',
          enabled: !!preventOverflow,
          options: { boundary },
        },
        // allow users override internal modifiers
        ...modifiers,
      ],
      strategy,
    })

    // force update one-time to fix any positioning issues
    instance.current.forceUpdate()

    cleanup.current = instance.current.destroy
  }, [
    enabled,
    placementProp,
    modifiers,
    matchWidth,
    eventListeners,
    arrowPadding,
    offset,
    gutter,
    flip,
    preventOverflow,
    boundary,
    strategy,
  ])

  React.useEffect(() => {
    return () => {
      /**
       * Fast refresh might call this function and tear down the popper
       * even if the reference still exists. This checks against that
       */
      if (!reference.current && !popper.current) {
        instance.current?.destroy()
        instance.current = null
      }
    }
  }, [])

  const referenceRef = React.useCallback(
    <T extends Element | VirtualElement>(node: T | null) => {
      reference.current = node
      setupPopper()
    },
    [setupPopper]
  )

  const getReferenceProps = React.useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref: mergeRefs(referenceRef, ref),
    }),
    [referenceRef]
  )

  const popperRef = React.useCallback(
    <T extends HTMLElement>(node: T | null) => {
      popper.current = node
      setupPopper()
    },
    [setupPopper]
  )

  const getPopperProps = React.useCallback(
    (props = {}, ref = null) => ({
      ...props,
      ref: mergeRefs(popperRef, ref),
      style: {
        zIndex: 1000,
        ...props.style,
        position: strategy,
        inset: '0 auto auto 0',
      },
    }),
    [strategy, popperRef]
  )

  const arrowRef = React.useCallback(
    <T extends HTMLElement>(node: T | null) => {
      arrow.current = node
      setupPopper()
    },
    [setupPopper]
  )

  const getArrowProps = React.useCallback((props = {}, ref = null) => {
    const { size, shadowColor, bg, style, ...rest } = props
    return {
      ...rest,
      ref,
      'data-popper-arrow': '',
    }
  }, [])

  return {
    update: instance.current?.update,
    forceUpdate: instance.current?.forceUpdate,

    referenceRef,
    popperRef,
    arrowRef,

    getPopperProps,
    getArrowProps,
    getReferenceProps,
  }
}
