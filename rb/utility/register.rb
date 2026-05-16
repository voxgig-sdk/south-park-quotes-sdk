# SouthParkQuotes SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

SouthParkQuotesUtility.registrar = ->(u) {
  u.clean = SouthParkQuotesUtilities::Clean
  u.done = SouthParkQuotesUtilities::Done
  u.make_error = SouthParkQuotesUtilities::MakeError
  u.feature_add = SouthParkQuotesUtilities::FeatureAdd
  u.feature_hook = SouthParkQuotesUtilities::FeatureHook
  u.feature_init = SouthParkQuotesUtilities::FeatureInit
  u.fetcher = SouthParkQuotesUtilities::Fetcher
  u.make_fetch_def = SouthParkQuotesUtilities::MakeFetchDef
  u.make_context = SouthParkQuotesUtilities::MakeContext
  u.make_options = SouthParkQuotesUtilities::MakeOptions
  u.make_request = SouthParkQuotesUtilities::MakeRequest
  u.make_response = SouthParkQuotesUtilities::MakeResponse
  u.make_result = SouthParkQuotesUtilities::MakeResult
  u.make_point = SouthParkQuotesUtilities::MakePoint
  u.make_spec = SouthParkQuotesUtilities::MakeSpec
  u.make_url = SouthParkQuotesUtilities::MakeUrl
  u.param = SouthParkQuotesUtilities::Param
  u.prepare_auth = SouthParkQuotesUtilities::PrepareAuth
  u.prepare_body = SouthParkQuotesUtilities::PrepareBody
  u.prepare_headers = SouthParkQuotesUtilities::PrepareHeaders
  u.prepare_method = SouthParkQuotesUtilities::PrepareMethod
  u.prepare_params = SouthParkQuotesUtilities::PrepareParams
  u.prepare_path = SouthParkQuotesUtilities::PreparePath
  u.prepare_query = SouthParkQuotesUtilities::PrepareQuery
  u.result_basic = SouthParkQuotesUtilities::ResultBasic
  u.result_body = SouthParkQuotesUtilities::ResultBody
  u.result_headers = SouthParkQuotesUtilities::ResultHeaders
  u.transform_request = SouthParkQuotesUtilities::TransformRequest
  u.transform_response = SouthParkQuotesUtilities::TransformResponse
}
