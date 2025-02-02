---
title: "Messages / get"
parent: "@messageformat/runtime"
grand_parent: API Reference
nav_exclude: true
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->



# Messages.get() method

Get the message or object corresponding to `key`

<b>Signature:</b>

```typescript
get(key: string | string[], props?: Record<string, unknown>, locale?: string): string | unknown[] | MessageData;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  key | string \| string\[\] | The key or keypath being sought |
|  props | Record&lt;string, unknown&gt; | <i>(Optional)</i> Optional properties passed to the function |
|  locale | string | <i>(Optional)</i> |

<b>Returns:</b>

string \| unknown\[\] \| [MessageData](./runtime.messagedata.md)

## Remarks

`key` may be a `string` for functions at the root level, or `string[]` for accessing hierarchical objects. If an exact match is not found, the fallback locales are checked for the first match.

If `key` maps to a message function, the returned value will be the result of calling it with `props`<!-- -->. If it maps to an object, the object is returned directly. If nothing is found, `key` is returned.

