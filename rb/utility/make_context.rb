# SouthParkQuotes SDK utility: make_context
require_relative '../core/context'
module SouthParkQuotesUtilities
  MakeContext = ->(ctxmap, basectx) {
    SouthParkQuotesContext.new(ctxmap, basectx)
  }
end
