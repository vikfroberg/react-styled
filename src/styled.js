import { createElement } from 'react'
import { merge, pick } from 'lodash'
import Block from './Block'

export default function styled(component, transformer) {
  const propsTransformer = typeof transformer === 'function'
    ? transformer
    : createCSSTransformer(transformer)

  const mergePropsTransformer =
    createMergeTransformer(propsTransformer)

  if (isStyledComponent(component)) {
    return createStyledComponent(component, mergePropsTransformer)
  }
  return createStyledElement(component, mergePropsTransformer)

}

const COMPONENT_KEY = '__REACT_STYLED_COMPONENT'

function isStyledComponent(component) {
  return !!component[COMPONENT_KEY]
}

function tagStyledComponent(component) {
  component[COMPONENT_KEY] = true
  return component
}

function createCSSTransformer(css) {
  return props => ({
    ...props,
    css
  })
}

function createMergeTransformer(transformer) {
  return props => mergeRightKeys(props, transformer(props))
}

function createStyledComponent(component, transformer) {
  function StyledComponent(props) {
    return component(transformer(props))
  }
  return tagStyledComponent(StyledComponent)
}

function createStyledElement(component, transformer) {
  function StyledElement(props) {
    return createElement(
      Block,
      { component, ...transformer(props) },
    )
  }
  return tagStyledComponent(StyledElement)
}

function mergeRightKeys(a, b) {
  const mergedProps = merge({}, a, b)
  return pick(mergedProps, Object.keys(b))
}
