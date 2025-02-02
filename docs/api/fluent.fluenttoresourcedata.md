---
title: "fluentToResourceData"
parent: "@messageformat/fluent"
grand_parent: API Reference
---

<!-- Do not edit this file. It is automatically generated by API Documenter. -->



# fluentToResourceData() function

> This API is provided as a preview for developers and may change based on feedback that we receive. Do not use this API in a production environment.
> 

Compile a Fluent resource (i.e. an FTL file) into a Map of [Message](./messageformat.message.md) data objects.

<b>Signature:</b>

```typescript
export declare function fluentToResourceData(source: string | Fluent.Resource): {
    data: Map<string, Message>;
    comments: string;
};
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  source | string \| Fluent.Resource | A Fluent resource, as the string contents of an FTL file or as a [Fluent.Resource](https://projectfluent.org/fluent.js/syntax/classes/resource.html) |

<b>Returns:</b>

{ data: Map&lt;string, [Message](./messageformat.message.md)<!-- -->&gt;; comments: string; }

An object containing the messages as `data` and any resource-level `comments` of the resource.

