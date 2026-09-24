"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('QuoteEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SOUTH_PARK_QUOTES_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SOUTH_PARK_QUOTES_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SouthParkQuotesSDK.test();
        const ent = testsdk.Quote();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SOUTH_PARK_QUOTES_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'quote.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "character": { "a": true, "h": "Character", "n": "character", "r": true, "sh": "The character who said the quote", "t": "`$STRING`", "key$": "character", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 1 }, "quote": { "a": true, "h": "Quote", "n": "quote", "r": true, "sh": "The quote text from South Park", "t": "`$STRING`", "key$": "quote", "index$": 2 } }, "id": { "field": "id", "name": "id" }, "name": "quote", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/quotes", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/v1/quotes", "q": {}, "r": {}, "s": [{ "lit": "v1" }, { "lit": "quotes" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/quotes/{number}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 3, "k": "param", "n": "id", "or": "number", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/quotes/{number}", "q": { "exist": ["id"] }, "r": { "param": { "number": "id" } }, "s": [{ "lit": "v1" }, { "lit": "quotes" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v1/quotes/search/{searchTerm}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "randy", "k": "param", "n": "search_term", "or": "search_term", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/quotes/search/{searchTerm}", "q": { "exist": ["search_term"] }, "r": { "param": { "searchTerm": "search_term" } }, "s": [{ "lit": "v1" }, { "lit": "quotes" }, { "lit": "search" }, { "var": "search_term" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "quote", "name__orig": "quote", "Name": "Quote", "name_": "quote", "name-": "quote", "NAME": "QUOTE", "index$": 0 }, { "active": true, "entity": "quote", "key$": "BasicQuoteFlow", "kind": "basic", "name": "BasicQuoteFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "quote_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "quote_ref01", "srcdatavar": "quote_ref01_data", "suffix": "_dt0" }, "m": { "id": "quote01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-quote_ref01" } }], "index$": 1 }] }, 'Quote', { "GET /v1/quotes": { "protocol": "http", "operationId": "getRandomQuote", "responses": { "200": { "description": "A random South Park quote", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "quote": { "type": "string", "description": "The quote text from South Park", "key$": "quote" }, "character": { "type": "string", "description": "The character who said the quote", "key$": "character" } }, "required": ["quote", "character"], "x-ref": "#/components/schemas/Quote", "index$": 0 }, "minItems": 1, "maxItems": 1 }, "example": [{ "quote": "Don't you dare call me a Cartman!", "character": "Stan" }] } } } }, "parameters": [], "securitySource": "unspecified" }, "GET /v1/quotes/{number}": { "protocol": "http", "operationId": "getMultipleQuotes", "responses": { "200": { "description": "An array of South Park quotes", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "quote": { "type": "string", "description": "The quote text from South Park", "key$": "quote" }, "character": { "type": "string", "description": "The character who said the quote", "key$": "character" } }, "required": ["quote", "character"], "x-ref": "#/components/schemas/Quote", "key$": "items" } }, "example": [{ "quote": "I'm not fat, I'm festively plump.", "character": "Cartman" }, { "quote": "But what does being Hawaiian have to do with me being like an emo chick on her period?", "character": "Butters" }, { "quote": "Cartman doesn't know a rainforest from a Pop-Tart.", "character": "Stan" }] } } } }, "parameters": [{ "name": "number", "in": "path", "required": true, "description": "The number of quotes to retrieve", "schema": { "type": "integer", "minimum": 1, "example": 3 }, "index$": 0 }], "securitySource": "unspecified" }, "GET /v1/quotes/search/{searchTerm}": { "protocol": "http", "operationId": "searchQuotes", "responses": { "200": { "description": "An array of matching South Park quotes", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "quote": { "type": "string", "description": "The quote text from South Park", "key$": "quote" }, "character": { "type": "string", "description": "The character who said the quote", "key$": "character" } }, "required": ["quote", "character"], "x-ref": "#/components/schemas/Quote", "key$": "items" } }, "example": [{ "quote": "as you get older, boobs will start becoming a major part of your life. but you can't let them get in the way of your friends. there are a lot of boobs out there. but they're just boobs. your friends are forever.", "character": "randy" }, { "quote": "we must stop frivolous spending! instead of paying for cable, let us watch clouds! instead of buying clothes, wear but sheets from thine beds! cut spending to only the bare essentials! water and bread and margaritas!", "character": "randy" }, { "quote": "oh, i forgot to tell you that part. i'm lorde.", "character": "randy" }, { "quote": "i ammm lorde. lawdy lawdy lorde!", "character": "randy" }, { "quote": "winter's coming, sharon, and i'm a busy little bee. buzz! buzz!", "character": "randy" }, { "quote": "oh, i'm sorry! i thought this was america!", "character": "randy" }, { "quote": "i'm not having a glass of wine, i'm having six. it's called a tasting, and it's classy.", "character": "randy" }] } } } }, "parameters": [{ "name": "searchTerm", "in": "path", "required": true, "description": "The search term to filter quotes by (character name or text within quote)", "schema": { "type": "string", "example": "randy" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let quote_ref01_data = Object.values(setup.data.existing.quote)[0];
        // LIST
        const quote_ref01_ent = client.Quote();
        const quote_ref01_match = {};
        const quote_ref01_list = (await quote_ref01_ent.list(quote_ref01_match)).map((e) => e.data());
        // LOAD
        const quote_ref01_match_dt0 = {};
        quote_ref01_match_dt0.id = quote_ref01_data.id;
        const quote_ref01_data_dt0 = (await quote_ref01_ent.load(quote_ref01_match_dt0)).data();
        (0, node_assert_1.default)(quote_ref01_data_dt0.id === quote_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/quote/QuoteTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SouthParkQuotesSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['quote01', 'quote02', 'quote03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SOUTH_PARK_QUOTES_TEST_QUOTE_ENTID': idmap,
        'SOUTH_PARK_QUOTES_TEST_LIVE': 'FALSE',
        'SOUTH_PARK_QUOTES_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['SOUTH_PARK_QUOTES_TEST_QUOTE_ENTID'];
    const live = 'TRUE' === env.SOUTH_PARK_QUOTES_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SOUTH_PARK_QUOTES_TEST_QUOTE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.SouthParkQuotesSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.SOUTH_PARK_QUOTES_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=QuoteEntity.test.js.map