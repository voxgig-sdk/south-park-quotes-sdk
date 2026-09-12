<?php
declare(strict_types=1);

// SouthParkQuotes SDK configuration

class SouthParkQuotesConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "SouthParkQuotes",
                "slug" => "south-park-quotes",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://southparkquotes.onrender.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "quote" => [],
                ],
            ],
            "entity" => [
        'quote' => [
          'fields' => [
            [
              'name' => 'character',
              'req' => true,
              'short' => 'The character who said the quote',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'quote',
              'req' => true,
              'short' => 'The quote text from South Park',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'quote',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/quotes',
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'quotes',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'v1',
                    'quotes',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 3,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'number',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/quotes/{number}',
                  'rename' => [
                    'param' => [
                      'number' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'quotes',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'v1',
                    'quotes',
                    '{id}',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'randy',
                        'kind' => 'param',
                        'name' => 'search_term',
                        'orig' => 'search_term',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/v1/quotes/search/{searchTerm}',
                  'rename' => [
                    'param' => [
                      'searchTerm' => 'search_term',
                    ],
                  ],
                  'segments' => [
                    [
                      'lit' => 'v1',
                    ],
                    [
                      'lit' => 'quotes',
                    ],
                    [
                      'lit' => 'search',
                    ],
                    [
                      'var' => 'search_term',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'search_term',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'v1',
                    'quotes',
                    'search',
                    '{search_term}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'search',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return SouthParkQuotesFeatures::make_feature($name);
    }
}
