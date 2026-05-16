-- SouthParkQuotes SDK error

local SouthParkQuotesError = {}
SouthParkQuotesError.__index = SouthParkQuotesError


function SouthParkQuotesError.new(code, msg, ctx)
  local self = setmetatable({}, SouthParkQuotesError)
  self.is_sdk_error = true
  self.sdk = "SouthParkQuotes"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function SouthParkQuotesError:error()
  return self.msg
end


function SouthParkQuotesError:__tostring()
  return self.msg
end


return SouthParkQuotesError
