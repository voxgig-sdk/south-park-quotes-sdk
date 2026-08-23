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
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "name" => "quote",
              "req" => true,
              "short" => "The quote text from South Park",
              "type" => "`$STRING`",
            },
          ],
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
                  "parts" => [
                    "v1",
                    "quotes",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
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
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
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
                  "select" => {
                    "exist" => [
                      "search_term",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
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
