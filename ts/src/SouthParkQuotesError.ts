
import { Context } from './Context'


class SouthParkQuotesError extends Error {

  isSouthParkQuotesError = true

  sdk = 'SouthParkQuotes'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  SouthParkQuotesError
}

