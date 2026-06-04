package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "SouthParkQuotes",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://southparkquotes.onrender.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"quote": map[string]any{},
			},
		},
		"entity": map[string]any{
			"quote": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "character",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "quote",
						"req": true,
						"type": "`$STRING`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "quote",
				"op": map[string]any{
					"list": map[string]any{
						"name": "list",
						"points": []any{
							map[string]any{
								"method": "GET",
								"orig": "/v1/quotes",
								"parts": []any{
									"v1",
									"quotes",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 3,
											"kind": "param",
											"name": "id",
											"orig": "number",
											"reqd": true,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/v1/quotes/{number}",
								"parts": []any{
									"v1",
									"quotes",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"number": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "randy",
											"kind": "param",
											"name": "search_term",
											"orig": "search_term",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/v1/quotes/search/{searchTerm}",
								"parts": []any{
									"v1",
									"quotes",
									"search",
									"{search_term}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"searchTerm": "search_term",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"search_term",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"index$": 1,
							},
						},
						"input": "data",
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"search",
						},
					},
				},
			},
		},
	}
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
