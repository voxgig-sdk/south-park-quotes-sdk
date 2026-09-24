
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { SouthParkQuotesSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = SouthParkQuotesSDK.test()
    equal(testsdk instanceof SouthParkQuotesSDK, true,
      'SouthParkQuotesSDK.test() must return a client synchronously')
  })

})
