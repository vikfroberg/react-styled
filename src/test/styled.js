import test from 'ava'
import * as stub from '..'

stub.Block = props => props
const styled = stub.styled

const color = '#fff'
const font = 'Arial'
const backgroundColor = '#000'

test('renders a Block', t => {
  const Component = styled('div')

  const element = Component({})

  t.is(element.type, stub.Block)
})

test('forwards css to Block', t => {
  const Component = styled('div', { color })

  const element = Component({})

  t.deepEqual(element.props.css, { color })
})

test('forwards component to Block', t => {
  const Component = styled('div')

  const element = Component({ component: 'span' })

  t.deepEqual(element.props.component, 'span')
})

test('transforms props', t => {
  const Component = styled('div', props => ({
    ...props,
    css: { color },
  }))

  const element = Component({})

  t.deepEqual(element.props.css, { color })
})

test('only passes returned props', t => {
  const Component = styled('div', ({ color }) => ({
  }))

  const element = Component({ color })

  t.deepEqual(element.props, {})
})

test('merges inline css', t => {
  const Component = styled('div', { color })

  const element = Component({ css: { backgroundColor } })

  t.deepEqual(element.props.css, { color, backgroundColor })
})

test('inherits css', t => {
  const ParentComponent = styled('div', { color })
  const Component = styled(ParentComponent, { backgroundColor })

  const element = Component({})

  t.deepEqual(element.props.css, { color, backgroundColor })
})

test('inline component with inherited css', t => {
  const ParentComponent = styled('div')
  const Component = styled(ParentComponent)

  const element = Component({ component: 'span' })

  t.deepEqual(element.props.component, 'span')
})

test('inline css with inherited css', t => {
  const ParentComponent = styled('div', { color })
  const Component = styled(ParentComponent, { backgroundColor })

  const element = Component({ css: { font } })

  t.deepEqual(element.props.css, { font, color, backgroundColor })
})

