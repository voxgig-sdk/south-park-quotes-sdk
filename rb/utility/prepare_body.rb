# SouthParkQuotes SDK utility: prepare_body
require_relative 'media'
module SouthParkQuotesUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return SouthParkQuotesUtilities.raw_body(ctx.reqdata) if SouthParkQuotesUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
