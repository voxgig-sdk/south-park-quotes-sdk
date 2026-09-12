
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'SouthParkQuotes',
        slug: "south-park-quotes",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://southparkquotes.onrender.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      quote: {
      },

    }
  }


  entity = {
    "quote": {
      "fields": [
        {
          "name": "character",
          "req": true,
          "short": "The character who said the quote",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "quote",
          "req": true,
          "short": "The quote text from South Park",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                  "lit": "v1"
                },
                {
                  "lit": "quotes"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "v1",
                "quotes"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/quotes/{number}",
              "rename": {
                "param": {
                  "number": "id"
                }
              },
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "quotes"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "v1",
                "quotes",
                "{id}"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "example": "randy",
                    "kind": "param",
                    "name": "search_term",
                    "orig": "search_term",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/v1/quotes/search/{searchTerm}",
              "rename": {
                "param": {
                  "searchTerm": "search_term"
                }
              },
              "segments": [
                {
                  "lit": "v1"
                },
                {
                  "lit": "quotes"
                },
                {
                  "lit": "search"
                },
                {
                  "var": "search_term"
                }
              ],
              "select": {
                "exist": [
                  "search_term"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "v1",
                "quotes",
                "search",
                "{search_term}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "search"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

