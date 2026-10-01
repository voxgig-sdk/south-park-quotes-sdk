"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "quote",
        "accessor": "Quote",
        "op": "list",
        "method": "GET",
        "path": "/v1/quotes",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "quote": "Don't you dare call me a Cartman!",
                "character": "Stan"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "quote",
        "accessor": "Quote",
        "op": "load",
        "method": "GET",
        "path": "/v1/quotes/{number}",
        "args": [
            {
                "name": "id",
                "wire": "number",
                "value": 3
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "quote": "I'm not fat, I'm festively plump.",
                "character": "Cartman"
            },
            {
                "quote": "But what does being Hawaiian have to do with me being like an emo chick on her period?",
                "character": "Butters"
            },
            {
                "quote": "Cartman doesn't know a rainforest from a Pop-Tart.",
                "character": "Stan"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "quote",
        "accessor": "Quote",
        "op": "load",
        "method": "GET",
        "path": "/v1/quotes/search/{searchTerm}",
        "args": [
            {
                "name": "search_term",
                "wire": "searchTerm",
                "value": "randy"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "quote": "as you get older, boobs will start becoming a major part of your life. but you can't let them get in the way of your friends. there are a lot of boobs out there. but they're just boobs. your friends are forever.",
                "character": "randy"
            },
            {
                "quote": "we must stop frivolous spending! instead of paying for cable, let us watch clouds! instead of buying clothes, wear but sheets from thine beds! cut spending to only the bare essentials! water and bread and margaritas!",
                "character": "randy"
            },
            {
                "quote": "oh, i forgot to tell you that part. i'm lorde.",
                "character": "randy"
            }
        ],
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map