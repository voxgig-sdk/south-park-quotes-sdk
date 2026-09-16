# SouthParkQuotes SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module SouthParkQuotesFeatures
  def self.make_feature(name)
    case name
    when "base"
      SouthParkQuotesBaseFeature.new
    when "ratelimit"
      SouthParkQuotesRatelimitFeature.new
    when "retry"
      SouthParkQuotesRetryFeature.new
    when "test"
      SouthParkQuotesTestFeature.new
    when "timeout"
      SouthParkQuotesTimeoutFeature.new
    else
      SouthParkQuotesBaseFeature.new
    end
  end
end
