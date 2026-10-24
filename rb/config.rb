# SouthParkQuotes SDK configuration

module SouthParkQuotesConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "SouthParkQuotes",
        "slug" => "south-park-quotes",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "now" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://southparkquotes.onrender.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "quote" => {},
        },
      },
      "entity" => {
        "quote" => {
          "fields" => [
            {
              "name" => "character",
              "title" => "Character",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The character who said the quote",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "quote",
              "title" => "Quote",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "The quote text from South Park",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "quote",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/quotes",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "quotes",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "quotes",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/quotes/{number}",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "quotes",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "quotes",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "number" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "number",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => 3,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/quotes/search/{searchTerm}",
                  "segments" => [
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "quotes",
                    },
                    {
                      "lit" => "search",
                    },
                    {
                      "var" => "search_term",
                    },
                  ],
                  "parts" => [
                    "v1",
                    "quotes",
                    "search",
                    "{search_term}",
                  ],
                  "rename" => {
                    "param" => {
                      "searchTerm" => "search_term",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "search_term",
                        "orig" => "searchTerm",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "randy",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "search_term",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    SouthParkQuotesFeatures.make_feature(name)
  end
end
