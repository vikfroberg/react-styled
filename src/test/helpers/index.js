import test from 'ava'
import { concat } from 'lodash'

export {
  stackTrace,
}

function stackTrace(c, p) {
  const r = c(p)
  if (typeof r.type === 'function') {
    return concat(r, stackTrace(r.type, r.props))
  }
  return [r]
}
