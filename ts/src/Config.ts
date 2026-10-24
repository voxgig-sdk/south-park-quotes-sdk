
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
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
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "now": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
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
          "title": "Character",
          "type": "`$STRING`",
          "req": true,
          "short": "The character who said the quote"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "quote",
          "title": "Quote",
          "type": "`$STRING`",
          "req": true,
          "short": "The quote text from South Park"
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
              "parts": [
                "v1",
                "quotes"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {},
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/quotes/{number}",
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
              "parts": [
                "v1",
                "quotes",
                "{id}"
              ],
              "rename": {
                "param": {
                  "number": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "number",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true,
                    "example": 3
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v1/quotes/search/{searchTerm}",
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
              "parts": [
                "v1",
                "quotes",
                "search",
                "{search_term}"
              ],
              "rename": {
                "param": {
                  "searchTerm": "search_term"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "search_term",
                    "orig": "searchTerm",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true,
                    "example": "randy"
                  }
                ]
              },
              "select": {
                "exist": [
                  "search_term"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

