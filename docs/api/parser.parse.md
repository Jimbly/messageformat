---
title: "parse"
parent: "@messageformat/parser"
grand_parent: API Reference
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->



# parse() function

Parse an input string into an array of tokens

<b>Signature:</b>

```typescript
export declare function parse(src: string, options?: ParseOptions): Array<Content | PlainArg | FunctionArg | Select>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  src | string |  |
|  options | [ParseOptions](./parser.parseoptions.md) | <i>(Optional)</i> |

<b>Returns:</b>

Array&lt;[Content](./parser.content.md) \| [PlainArg](./parser.plainarg.md) \| [FunctionArg](./parser.functionarg.md) \| [Select](./parser.select.md)<!-- -->&gt;

## Remarks

The parser only supports the default `DOUBLE_OPTIONAL` [apostrophe mode](http://www.icu-project.org/apiref/icu4c/messagepattern_8h.html#af6e0757e0eb81c980b01ee5d68a9978b)<!-- -->.

