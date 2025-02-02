---
title: "parseDateTokens"
parent: "@messageformat/date-skeleton"
grand_parent: API Reference
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->



# parseDateTokens() function

Parse an [ICU DateFormat skeleton](http://userguide.icu-project.org/formatparse/datetime) string into a [DateToken](./date-skeleton.datetoken.md) array.

<b>Signature:</b>

```typescript
export declare function parseDateTokens(src: string): DateToken[];
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  src | string | The skeleton string |

<b>Returns:</b>

[DateToken](./date-skeleton.datetoken.md)<!-- -->\[\]

## Remarks

Errors will not be thrown, but if encountered are included as the relevant token's `error` value.

## Example


```js
import { parseDateTokens } from '@messageformat/date-skeleton'

parseDateTokens('GrMMMdd', console.error)
// [
//   { char: 'G', field: 'era', desc: 'Era', width: 1 },
//   { char: 'r', field: 'year', desc: 'Related Gregorian year', width: 1 },
//   { char: 'M', field: 'month', desc: 'Month in year', width: 3 },
//   { char: 'd', field: 'day', desc: 'Day in month', width: 2 }
// ]
```

