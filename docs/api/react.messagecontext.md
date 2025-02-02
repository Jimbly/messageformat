---
title: "MessageContext"
parent: "@messageformat/react"
grand_parent: API Reference
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->



# MessageContext variable

The context object used internally by the library. Probably only useful with `Class.contextType` or for building custom hooks.

<b>Signature:</b>

```typescript
MessageContext: Context<MessageContext>
```

## Example


```js
import React, { Component } from 'react'
import {
  getMessage,
  getMessageGetter,
  MessageContext,
  MessageProvider
} from '@messageformat/react'

const messages = {
  example: { key: 'Your message here' },
  other: { key: 'Another message' }
}

class Example extends Component {
  render() {
    const message = getMessage(this.context, 'example.key')
    const otherMsg = getMessageGetter(this.context, 'other')
    return (
      <span>
        {message} | {otherMsg('key')}
      </span>
    ) // 'Your message here | Another message'
  }
}
Example.contextType = MessageContext

export const App = () => (
  <MessageProvider messages={messages}>
    <Example />
  </MessageProvider>
)
```

