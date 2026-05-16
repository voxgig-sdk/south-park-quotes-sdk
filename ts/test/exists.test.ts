
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { SouthParkQuotesSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await SouthParkQuotesSDK.test()
    equal(null !== testsdk, true)
  })

})
