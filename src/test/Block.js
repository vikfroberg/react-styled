import test from 'ava'
import { Block } from '..'

const color = '#fff'

test('defaults to div', t => {
  const element = Block({})

  t.is(element.type, 'div')
})

test('override component', t => {
  const element = Block({ component: 'span' })

  t.is(element.type, 'span')
})

test('injects css', t => {
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

