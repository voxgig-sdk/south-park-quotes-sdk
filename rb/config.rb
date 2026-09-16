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
              "req" => true,
              "short" => "The character who said the quote",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "quote",
              "req" => true,
              "short" => "The quote text from South Park",
              "type" => "`$STRING`",
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
                  "args" => {},
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
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "v1",
                    "quotes",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 3,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "number",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/quotes/{number}",
                  "rename" => {
                    "param" => {
                      "number" => "id",
                    },
                  },
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
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "v1",
                    "quotes",
                    "{id}",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "randy",
                        "kind" => "param",
                        "name" => "search_term",
                        "orig" => "search_term",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/v1/quotes/search/{searchTerm}",
                  "rename" => {
                    "param" => {
                      "searchTerm" => "search_term",
                    },
                  },
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
                  "select" => {
                    "exist" => [
                      "search_term",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "v1",
                    "quotes",
                    "search",
                    "{search_term}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "search",
              ],
            ],
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
