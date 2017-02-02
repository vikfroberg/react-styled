# react-styled

```js
import React from 'react'
import Styletron from 'styletron-client'
import { injectStyle } from 'styletron-utils'
import styled, { Provider } from 'react-styled'

const Block = styled('div')

const Title = styled('h1', {
  fontSize: '20px',
})

const styletron = new Styletron()

const injectCSS = (css) => {
  const className = injectStyle(styletron, css)
  return className
}

React.render(
  <Provider onInjectCSS={injectCSS}>
    <Block css={{ padding: '10px' }}>
      <Title component='h2'>
        Well, hello there!
      </Title>
    </Block>
  </Provider>
)
```
