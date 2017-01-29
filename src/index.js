import React from 'react'
import _isValidAttr from './is-valid-attr'

/**
 * Public
 */
export default function omitInvalidPropsHOC(Component) {
  function OmitInvalidPropsComponent(props) {
    return React.createElement(
      Component,
      omitInvalidProps(props),
    )
  }

  return OmitInvalidPropsComponent
}

export function omitInvalidProps(props) {
  const keys = Object.keys(props)
  return keys.reduce(assignValidProp, {})

  function assignValidProp(acc, attr) {
    if (isValidAttr(attr)) {
      acc[attr] = props[attr]
    }
    return acc
  }
}

export function isValidAttr(attr) {
  return _isValidAttr(attr)
}

