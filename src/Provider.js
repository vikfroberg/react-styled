import { Children, PropTypes } from 'react'
import { compose, withContext, setPropTypes } from 'recompose'

exports.Provider = Provider

export default compose(
  withContext(
    { injectCSS: PropTypes.func.isRequired },
    props => ({ injectCSS: css => props.onInjectCSS(css) }),
  ),
  setPropTypes({
    onInjectCSS: PropTypes.func.isRequired,
  }),
)(exports.Provider)

function Provider({ children }) {
  return Children.only(children)
}
