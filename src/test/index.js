import test from 'ava'
import omitInvalidPropsHOC, { isValidAttr, omitInvalidProps } from '../index'

test('omitInvalidPropsHOC', t => {
  const initialProps = {
    name: 'Viktor',
    exclude: 'Me',
  }

  omitInvalidPropsHOC(comp)(initialProps)

  function comp(props) {
    t.deepEqual(
      props,
      { name: 'Viktor' },
    )
  }
})

test('omitInvalidProps', t => {
  const initialProps = {
    name: 'Viktor',
    exclude: 'Me',
  }

  const props = omitInvalidProps(initialProps)

  t.deepEqual(
    props,
    { name: 'Viktor' },
  )
})

test('isValidAttr', t => {
  t.true(isValidAttr('name'))
  t.false(isValidAttr('foo'))
})
