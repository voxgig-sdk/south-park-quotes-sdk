# SouthParkQuotes SDK



Available for [Golang](go/) and [Go CLI](go-cli/) and [Go MCP server](go-mcp/) and [Lua](lua/) and [PHP](php/) and [Python](py/) and [Ruby](rb/) and [TypeScript](ts/).


## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Quote** |  | `/v1/quotes` |

Each entity supports the following operations where available: **load**, **list**, **create**,
**update**, and **remove**.


## Architecture

### Entity-operation model

Every SDK call follows the same pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

At each stage a feature hook fires (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), allowing features to inspect or modify the pipeline.

### Features

Features are hook-based middleware that extend SDK behaviour.

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

You can add custom features by passing them in the `extend` option at
construction time.

### Direct and Prepare

For endpoints not covered by the entity model, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`, `headers`,
and `body`.


## Quick start

### Golang

```go
import sdk "github.com/voxgig-sdk/south-park-quotes-sdk/go"

client := sdk.NewSouthParkQuotesSDK(map[string]any{
    "apikey": os.Getenv("SOUTH-PARK-QUOTES_APIKEY"),
})

// List all quotes
quotes, err := client.Quote(nil).List(nil, nil)
```

### Lua

```lua
local sdk = require("south-park-quotes_sdk")

local client = sdk.new({
  apikey = os.getenv("SOUTH-PARK-QUOTES_APIKEY"),
})

-- List all quotes
local quotes, err = client:Quote(nil):list(nil, nil)

-- Load a specific quote
local quote, err = client:Quote(nil):load(
  { id = "example_id" }, nil
)
```

### PHP

```php
<?php
require_once 'southparkquotes_sdk.php';

$client = new SouthParkQuotesSDK([
    "apikey" => getenv("SOUTH-PARK-QUOTES_APIKEY"),
]);

// List all quotes
[$quotes, $err] = $client->Quote(null)->list(null, null);

// Load a specific quote
[$quote, $err] = $client->Quote(null)->load(
    ["id" => "example_id"], null
);
```

### Python

```python
import os
from southparkquotes_sdk import SouthParkQuotesSDK

client = SouthParkQuotesSDK({
    "apikey": os.environ.get("SOUTH-PARK-QUOTES_APIKEY"),
})

# List all quotes
quotes, err = client.Quote(None).list(None, None)

# Load a specific quote
quote, err = client.Quote(None).load(
    {"id": "example_id"}, None
)
```

### Ruby

```ruby
require_relative "SouthParkQuotes_sdk"

client = SouthParkQuotesSDK.new({
  "apikey" => ENV["SOUTH-PARK-QUOTES_APIKEY"],
})

# List all quotes
quotes, err = client.Quote(nil).list(nil, nil)

# Load a specific quote
quote, err = client.Quote(nil).load(
  { "id" => "example_id" }, nil
)
```

### TypeScript

```ts
import { SouthParkQuotesSDK } from 'south-park-quotes'

const client = new SouthParkQuotesSDK({
  apikey: process.env.SOUTH-PARK-QUOTES_APIKEY,
})

// List all quotes
const quotes = await client.Quote().list()
```


## Testing

Both SDKs provide a test mode that replaces the HTTP transport with an
in-memory mock, so tests run without a network connection.

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Quote(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Quote(nil):load(
  { id = "test01" }, nil
)
```

### PHP

```php
$client = SouthParkQuotesSDK::test(null, null);
[$result, $err] = $client->Quote(null)->load(
    ["id" => "test01"], null
);
```

### Python

```python
client = SouthParkQuotesSDK.test(None, None)
result, err = client.Quote(None).load(
    {"id": "test01"}, None
)
```

### Ruby

```ruby
client = SouthParkQuotesSDK.test(nil, nil)
result, err = client.Quote(nil).load(
  { "id" => "test01" }, nil
)
```

### TypeScript

```ts
const client = SouthParkQuotesSDK.test()
const result = await client.Quote().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```


## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```


## Language-specific documentation

- [Golang SDK](go/README.md)
- [Go CLI SDK](go-cli/README.md)
- [Go MCP server SDK](go-mcp/README.md)
- [Lua SDK](lua/README.md)
- [PHP SDK](php/README.md)
- [Python SDK](py/README.md)
- [Ruby SDK](rb/README.md)
- [TypeScript SDK](ts/README.md)

