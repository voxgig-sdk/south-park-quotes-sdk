# SouthParkQuotes SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "SouthParkQuotes",
            "slug": "south-park-quotes",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://southparkquotes.onrender.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "quote": {},
            },
        },
        "entity": {
      "quote": {
        "fields": [
          {
            "name": "character",
            "req": True,
            "short": "The character who said the quote",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "quote",
            "req": True,
            "short": "The quote text from South Park",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "quote",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/v1/quotes",
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "quotes",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "v1",
                  "quotes",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": 3,
                      "kind": "param",
                      "name": "id",
                      "orig": "number",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/quotes/{number}",
                "rename": {
                  "param": {
                    "number": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "quotes",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "v1",
                  "quotes",
                  "{id}",
                ],
              },
              {
                "args": {
                  "params": [
                    {
                      "example": "randy",
                      "kind": "param",
                      "name": "search_term",
                      "orig": "search_term",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/v1/quotes/search/{searchTerm}",
                "rename": {
                  "param": {
                    "searchTerm": "search_term",
                  },
                },
                "segments": [
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "quotes",
                  },
                  {
                    "lit": "search",
                  },
                  {
                    "var": "search_term",
                  },
                ],
                "select": {
                  "exist": [
                    "search_term",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "v1",
                  "quotes",
                  "search",
                  "{search_term}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "search",
            ],
          ],
        },
      },
    },
    }
