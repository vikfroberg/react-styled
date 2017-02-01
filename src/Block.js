import { createElement, PropTypes } from 'react'
import { compose, getContext, setPropTypes } from 'recompose'
import classnames from 'classnames'

exports.Block = Block

export default compose(
  getContext({
    injectCSS: PropTypes.func.isRequired,
  }),
  setPropTypes({
    component: PropTypes.element,
    css: PropTypes.object,
  }),
)(exports.Block)

function Block({
  css,
  injectCSS,
  component = 'div',
  className: inlineClassName,
  ...restProps,
}) {
  const className = classnames(
    injectCSS && injectCSS(css),
    inlineClassName,
  )

  const props = className.length > 0
    ? { className, ...restProps }
    : restProps

  return createElement(component, props)
}

