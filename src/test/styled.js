import test from 'ava'
import React from 'react'
import styled from '../styled'
import Block from '../Block'

const color = '#fff'
const font = 'Arial'
const backgroundColor = '#000'

test('returns an element', t => {
  const Component = styled('div')

  const element = Component({})

  t.true(React.isValidElement(element))
})

test('returns a Block', t => {
  const Component = styled('div')

  const element = Component({})

  t.is(element.type, Block)
})

test('passes css to Block', t => {
  const Component = styled('div', { color })

  const element = Component({})

  t.deepEqual(element.props.css, { color })
})

test('passes component to Block', t => {
  const Component = styled('span')

  const element = Component({})

  t.deepEqual(element.props.component, 'span')
})

test('passes props to Block', t => {
  const Component = styled('div')

  const element = Component({ id: 'a' })

  t.is(element.props.id, 'a')
})

test('passes inline css to Block', t => {
  const Component = styled('div')

  const element = Component({ css: { color } })

  t.deepEqual(element.props.css, { color })
})

test('passes inline component to Block', t => {
  const Component = styled('div')

  const element = Component({ component: 'span' })

  t.deepEqual(element.props.component, 'span')
})

test('merges inline css', t => {
  const Component = styled('div', { color })

  const element = Component({ css: { backgroundColor } })

  t.deepEqual(element.props.css, { color, backgroundColor })
})

test('inherits css recursively', t => {
  const GrandParent = styled('div', { color })
  const Parent = styled(GrandParent, { backgroundColor })
  const Component = styled(Parent, { font })

  const element = Component({})

  t.deepEqual(element.props.css, { color, backgroundColor, font })
})

test('transforms props', t => {
  const Component = styled('div', props => ({
    color,
  }))

  const element = Component({})

  t.deepEqual(element.props.color, color)
})

test('merges transformed props', t => {
  const Component = styled('div', props => ({
    css: { backgroundColor },
  }))

  const element = Component({ css: { color } })

  t.deepEqual(element.props.css, { color, backgroundColor })
})

test('only merge keys returned from transformer', t => {
  const Component = styled('div', props => ({
    backgroundColor,
  }))

  const element = Component({ color })

  t.is(element.props.backgroundColor, backgroundColor)
  t.is(element.props.color, undefined)
})
