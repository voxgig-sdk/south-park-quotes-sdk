# SouthParkQuotes SDK

Fetch random and searchable quotes from South Park characters

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About South Park Quotes API

The South Park Quotes API is a small community-maintained service that returns quotes from characters of the animated series *South Park*. It is hosted at [southparkquotes.onrender.com](https://southparkquotes.onrender.com) and the source lives on GitHub at [Thatskat/southpark-quotes-api](https://github.com/Thatskat/southpark-quotes-api).

What you get from the API:

- A random quote from `GET /v1/quotes`
- A specific number of random quotes from `GET /v1/quotes/{number}` (e.g. `/v1/quotes/3`)
- Quotes filtered by character name or text from `GET /v1/quotes/search/{searchTerm}` (e.g. `/v1/quotes/search/randy`)
- Each quote object contains a `quote` string and a `character` string.

The API is open: no authentication or API key is required, and CORS is enabled so it can be called directly from browser code. The quote dataset is community-curated through pull requests on the upstream GitHub repository.

## Try it

**TypeScript**
```bash
npm install south-park-quotes
```

**Python**
```bash
pip install south-park-quotes-sdk
```

**PHP**
```bash
composer require voxgig/south-park-quotes-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/south-park-quotes-sdk/go
```

**Ruby**
```bash
gem install south-park-quotes-sdk
```

**Lua**
```bash
luarocks install south-park-quotes-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { SouthParkQuotesSDK } from 'south-park-quotes'

const client = new SouthParkQuotesSDK({})

// List all quotes
const quotes = await client.Quote().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o south-park-quotes-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "south-park-quotes": {
      "command": "/abs/path/to/south-park-quotes-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **Quote** | A single South Park quote with its attributed `character`, exposed via `GET /v1/quotes`, `GET /v1/quotes/{number}`, and `GET /v1/quotes/search/{searchTerm}`. | `/v1/quotes` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from southparkquotes_sdk import SouthParkQuotesSDK

client = SouthParkQuotesSDK({})

# List all quotes
quotes, err = client.Quote(None).list(None, None)

# Load a specific quote
quote, err = client.Quote(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'southparkquotes_sdk.php';

$client = new SouthParkQuotesSDK([]);

// List all quotes
[$quotes, $err] = $client->Quote(null)->list(null, null);

// Load a specific quote
[$quote, $err] = $client->Quote(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/south-park-quotes-sdk/go"

client := sdk.NewSouthParkQuotesSDK(map[string]any{})

// List all quotes
quotes, err := client.Quote(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "SouthParkQuotes_sdk"

client = SouthParkQuotesSDK.new({})

# List all quotes
quotes, err = client.Quote(nil).list(nil, nil)

# Load a specific quote
quote, err = client.Quote(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("south-park-quotes_sdk")

local client = sdk.new({})

-- List all quotes
local quotes, err = client:Quote(nil):list(nil, nil)

-- Load a specific quote
local quote, err = client:Quote(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = SouthParkQuotesSDK.test()
const result = await client.Quote().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = SouthParkQuotesSDK.test(None, None)
result, err = client.Quote(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = SouthParkQuotesSDK::test(null, null);
[$result, $err] = $client->Quote(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Quote(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = SouthParkQuotesSDK.test(nil, nil)
result, err = client.Quote(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Quote(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
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

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
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

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the South Park Quotes API

- Upstream: [https://southparkquotes.onrender.com](https://southparkquotes.onrender.com)
- API docs: [https://github.com/Thatskat/southpark-quotes-api](https://github.com/Thatskat/southpark-quotes-api)

- Released under the MIT License.
- Free to use, modify, and redistribute with attribution.
- South Park names, characters, and quotes remain the property of their respective rights holders; this API is an unofficial fan project.

---

Generated from the South Park Quotes API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
