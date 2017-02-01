import 'source-map-support/register'
import { Children, PropTypes, createElement } from 'react'
import { merge, pick } from 'lodash'
import { getContext, withContext } from 'recompose'
import classnames from 'classnames'

export default createInjectCSS()(styled)
exports.Provider = createWithInjectCSS()(Provider)
exports.Block = Block
exports.styled = styled

function Provider({ children }) {
  return Children.only(children)
}

function createWithInjectCSS() {
  return withContext(
    { injectCSS: PropTypes.func.isRequired },
    props => ({
      injectCSS: css => props.onInjectCSS(css),
    }),
  )
}

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

  return createElement(
    component,
    props,
  )
}

function createInjectCSS() {
  return getContext({
    injectCSS: PropTypes.func.isRequired,
  })
}

function styled(component, css) {
  const transformer = typeof css === 'function'
    ? props => css(props)
    : props => merge({ css }, props)

  return createStyledComponent(
    component,
    transformer,
  )
}

const COMPONENT_KEY = '__REACT_STYLED_COMPONENT'

function isStyledComponent(component) {
  return !!component[COMPONENT_KEY]
}

function createStyledComponent(component, transformer) {
  const propsTransform = props =>
    mergeRight(props, transformer(props))

  if (isStyledComponent(component)) {
    return props => component(propsTransform(props))
  }

  const StyledComponent = props => createElement(
    exports.Block,
    propsTransform(props),
  )
  StyledComponent[COMPONENT_KEY] = true
  return StyledComponent
}

function mergeRight(a, b) {
  const mergedProps = merge({}, a, b)
  return pick(mergedProps, Object.keys(b))
}

