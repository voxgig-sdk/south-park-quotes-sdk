# SouthParkQuotes SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module SouthParkQuotesFeatures
  def self.make_feature(name)
    case name
    when "base"
      SouthParkQuotesBaseFeature.new
    when "test"
      SouthParkQuotesTestFeature.new
    else
      SouthParkQuotesBaseFeature.new
    end
  end
end
