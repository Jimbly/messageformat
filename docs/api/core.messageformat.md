---
title: "MessageFormat"
parent: "@messageformat/core"
grand_parent: API Reference
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->



# MessageFormat class

The core MessageFormat-to-JavaScript compiler

<b>Signature:</b>

```typescript
export default class MessageFormat<ReturnType extends 'string' | 'values' = 'string'> 
```

## Example


```js
import MessageFormat from '@messageformat/core'
const mf = new MessageFormat('en')

const msgSrc = `{GENDER, select,
  male {He} female {She} other {They}
} found {RES, plural,
  =0 {no results} one {1 result} other {# results}
}.`;
const msg = mf.compile(msgSrc)

msg({ GENDER: 'male', RES: 1 })    // 'He found 1 result.'
msg({ GENDER: 'female', RES: 1 })  // 'She found 1 result.'
msg({ GENDER: 'male', RES: 0 })    // 'He found no results.'
msg({ RES: 2 })                    // 'They found 2 results.'
```

## Constructors

|  Constructor | Modifiers | Description |
|  --- | --- | --- |
|  [(constructor)(locale, options)](./core.messageformat._constructor_.md) |  | Create a new MessageFormat compiler |

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [defaultLocale](./core.messageformat.defaultlocale.md) | <code>static</code> | string | Used by the constructor when no <code>locale</code> argument is given. Default: <code>'en'</code> |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [compile(message)](./core.messageformat.compile.md) |  | Compile a message into a function |
|  [escape(str, octothorpe)](./core.messageformat.escape.md) | <code>static</code> | Escape characaters that may be considered as MessageFormat markup |
|  [resolvedOptions()](./core.messageformat.resolvedoptions.md) |  | Returns a new object with properties reflecting the default locale, plurals, and other options computed during initialization. |
|  [supportedLocalesOf(locales)](./core.messageformat.supportedlocalesof.md) | <code>static</code> | Returns a subset of <code>locales</code> consisting of those for which MessageFormat has built-in plural category support. |

