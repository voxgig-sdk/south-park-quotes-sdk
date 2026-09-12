-- SouthParkQuotes SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "SouthParkQuotes",
      slug = "south-park-quotes",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://southparkquotes.onrender.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["quote"] = {},
      },
    },
    entity = {
      ["quote"] = {
        ["fields"] = {
          {
            ["name"] = "character",
            ["req"] = true,
            ["short"] = "The character who said the quote",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "quote",
            ["req"] = true,
            ["short"] = "The quote text from South Park",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "quote",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/quotes",
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "quotes",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "v1",
                  "quotes",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = 3,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "number",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/quotes/{number}",
                ["rename"] = {
                  ["param"] = {
                    ["number"] = "id",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "quotes",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "v1",
                  "quotes",
                  "{id}",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "randy",
                      ["kind"] = "param",
                      ["name"] = "search_term",
                      ["orig"] = "search_term",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v1/quotes/search/{searchTerm}",
                ["rename"] = {
                  ["param"] = {
                    ["searchTerm"] = "search_term",
                  },
                },
                ["segments"] = {
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "quotes",
                  },
                  {
                    ["lit"] = "search",
                  },
                  {
                    ["var"] = "search_term",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "search_term",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "v1",
                  "quotes",
                  "search",
                  "{search_term}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "search",
            },
          },
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
