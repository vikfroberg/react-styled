# react-styled

```js
import Styletron from 'styletron'
import styled, { Provider } from 'react-styled'
import React from 'react'

const styletron = new Styletron()

React.render(<Provider onInjectCSS={css => injectStyle(styletron, css)}><App /></Provider>)
