import test from 'ava'
import React from 'react'
import { Block } from '../Block'

const color = '#fff'

test('creates an element', t => {
  const element = Block({})

  t.true(React.isValidElement(element))
})

test('defaults to div', t => {
  const element = Block({})

  t.is(element.type, 'div')
})

test('override component', t => {
  const element = Block({ component: 'span' })

  t.is(element.type, 'span')
})

test('injects css', t => {
  t.plan(1)
  const css = { color }

  const element = Block({ css, injectCSS })

  function injectCSS(val) {
    t.deepEqual(val, css)
  }
})

test('uses return classname', t => {
  function injectCSS(a) {
    return 'a'
  }

  const element = Block({ injectCSS })

  t.is(element.props.className, 'a')
})

test('merges inline classname', t => {
  function injectCSS(a) {
    return 'a'
  }

  const element = Block({ className: 'b', injectCSS })

  t.is(element.props.className, 'a b')
})

test('passes props to element', t => {
  const element = Block({ id: 'a' })

  t.is(element.props.id, 'a')
})

test('does not pass className if there is no classes', t => {
  const element = Block({})

  t.is(element.props.className, undefined)
})
