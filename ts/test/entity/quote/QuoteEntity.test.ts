

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { SouthParkQuotesSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('QuoteEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SOUTH_PARK_QUOTES_TEST_LIVE=TRUE.
  afterEach(liveDelay('SOUTH_PARK_QUOTES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SouthParkQuotesSDK.test()
    const ent = testsdk.Quote()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SOUTH_PARK_QUOTES_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'quote.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"character","req":true,"short":"The character who said the quote","type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"quote","req":true,"short":"The quote text from South Park","type":"`$STRING`","index$":2}],"id":{"field":"id","name":"id"},"name":"quote","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /v1/quotes","json":"{\"operationId\":\"getRandomQuote\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":[{\"character\":\"Stan\",\"quote\":\"Don't you dare call me a Cartman!\"}],\"schema\":{\"items\":{\"properties\":{\"character\":{\"description\":\"The character who said the quote\",\"type\":\"string\"},\"quote\":{\"description\":\"The quote text from South Park\",\"type\":\"string\"}},\"required\":[\"quote\",\"character\"],\"type\":\"object\"},\"maxItems\":1,\"minItems\":1,\"type\":\"array\"}}},\"description\":\"A random South Park quote\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/quotes","segments":[{"lit":"v1"},{"lit":"quotes"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":3,"kind":"param","name":"id","orig":"number","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /v1/quotes/{number}","json":"{\"operationId\":\"getMultipleQuotes\",\"parameters\":[{\"description\":\"The number of quotes to retrieve\",\"in\":\"path\",\"name\":\"number\",\"required\":true,\"schema\":{\"example\":3,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":[{\"character\":\"Cartman\",\"quote\":\"I'm not fat, I'm festively plump.\"},{\"character\":\"Butters\",\"quote\":\"But what does being Hawaiian have to do with me being like an emo chick on her period?\"},{\"character\":\"Stan\",\"quote\":\"Cartman doesn't know a rainforest from a Pop-Tart.\"}],\"schema\":{\"items\":{\"properties\":{\"character\":{\"description\":\"The character who said the quote\",\"type\":\"string\"},\"quote\":{\"description\":\"The quote text from South Park\",\"type\":\"string\"}},\"required\":[\"quote\",\"character\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"An array of South Park quotes\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/quotes/{number}","rename":{"param":{"number":"id"}},"segments":[{"lit":"v1"},{"lit":"quotes"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"example":"randy","kind":"param","name":"search_term","orig":"search_term","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /v1/quotes/search/{searchTerm}","json":"{\"operationId\":\"searchQuotes\",\"parameters\":[{\"description\":\"The search term to filter quotes by (character name or text within quote)\",\"in\":\"path\",\"name\":\"searchTerm\",\"required\":true,\"schema\":{\"example\":\"randy\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":[{\"character\":\"randy\",\"quote\":\"as you get older, boobs will start becoming a major part of your life. but you can't let them get in the way of your friends. there are a lot of boobs out there. but they're just boobs. your friends are forever.\"},{\"character\":\"randy\",\"quote\":\"we must stop frivolous spending! instead of paying for cable, let us watch clouds! instead of buying clothes, wear but sheets from thine beds! cut spending to only the bare essentials! water and bread and margaritas!\"},{\"character\":\"randy\",\"quote\":\"oh, i forgot to tell you that part. i'm lorde.\"},{\"character\":\"randy\",\"quote\":\"i ammm lorde. lawdy lawdy lorde!\"},{\"character\":\"randy\",\"quote\":\"winter's coming, sharon, and i'm a busy little bee. buzz! buzz!\"},{\"character\":\"randy\",\"quote\":\"oh, i'm sorry! i thought this was america!\"},{\"character\":\"randy\",\"quote\":\"i'm not having a glass of wine, i'm having six. it's called a tasting, and it's classy.\"}],\"schema\":{\"items\":{\"properties\":{\"character\":{\"description\":\"The character who said the quote\",\"type\":\"string\"},\"quote\":{\"description\":\"The quote text from South Park\",\"type\":\"string\"}},\"required\":[\"quote\",\"character\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"An array of matching South Park quotes\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/v1/quotes/search/{searchTerm}","rename":{"param":{"searchTerm":"search_term"}},"segments":[{"lit":"v1"},{"lit":"quotes"},{"lit":"search"},{"var":"search_term"}],"select":{"exist":["search_term"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["search"]]},"key$":"quote","name__orig":"quote","Name":"Quote","name_":"quote","name-":"quote","NAME":"QUOTE","index$":0}, {"active":true,"entity":"quote","key$":"BasicQuoteFlow","kind":"basic","name":"BasicQuoteFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"quote_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"quote_ref01","srcdatavar":"quote_ref01_data","suffix":"_dt0"},"match":{"id":"quote01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-quote_ref01"}}],"index$":1}]}, 'Quote')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let quote_ref01_data = Object.values(setup.data.existing.quote)[0] as any

    // LIST
    const quote_ref01_ent = client.Quote()
    const quote_ref01_match: any = {}

    const quote_ref01_list = (await quote_ref01_ent.list(quote_ref01_match)).map((e: any) => e.data())


    // LOAD
    const quote_ref01_match_dt0: any = {}
    quote_ref01_match_dt0.id = quote_ref01_data.id
    const quote_ref01_data_dt0 = (await quote_ref01_ent.load(quote_ref01_match_dt0)).data()
    assert(quote_ref01_data_dt0.id === quote_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/quote/QuoteTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = SouthParkQuotesSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['quote01','quote02','quote03','search01','search02','search03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SOUTH_PARK_QUOTES_TEST_QUOTE_ENTID': idmap,
    'SOUTH_PARK_QUOTES_TEST_LIVE': 'FALSE',
    'SOUTH_PARK_QUOTES_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['SOUTH_PARK_QUOTES_TEST_QUOTE_ENTID']

  const live = 'TRUE' === env.SOUTH_PARK_QUOTES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SOUTH_PARK_QUOTES_TEST_QUOTE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new SouthParkQuotesSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
