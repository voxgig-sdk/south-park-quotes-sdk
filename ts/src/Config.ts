
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://southparkquotes.onrender.com',

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
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "quote",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        }
      ],
      "name": "quote",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "method": "GET",
              "orig": "/v1/quotes",
              "parts": [
                "v1",
                "quotes"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        },
        "load": {
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
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/v1/quotes/{number}",
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
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
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
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/v1/quotes/search/{searchTerm}",
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
              "select": {
                "exist": [
                  "search_term"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 1
            }
          ],
          "input": "data",
          "key$": "load"
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
  config
}

