import classNames, { Binding } from 'classnames/bind'

/**
 * React hook that help working with css modules
 *
 * @param styles - styles
 * @returns {function}
 * @example
 * ```javascript
 * import styles from '../styles/Select.module.less'
 *
 * const cx = useStyles(styles)
 * const classNames = cx(className, 'container', { disabled })
 * ```
 */
export function useStyles(styles: Binding): typeof classNames {
  return classNames.bind(styles)
}
