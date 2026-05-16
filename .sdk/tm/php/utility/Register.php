<?php
declare(strict_types=1);

// SouthParkQuotes SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

SouthParkQuotesUtility::setRegistrar(function (SouthParkQuotesUtility $u): void {
    $u->clean = [SouthParkQuotesClean::class, 'call'];
    $u->done = [SouthParkQuotesDone::class, 'call'];
    $u->make_error = [SouthParkQuotesMakeError::class, 'call'];
    $u->feature_add = [SouthParkQuotesFeatureAdd::class, 'call'];
    $u->feature_hook = [SouthParkQuotesFeatureHook::class, 'call'];
    $u->feature_init = [SouthParkQuotesFeatureInit::class, 'call'];
    $u->fetcher = [SouthParkQuotesFetcher::class, 'call'];
    $u->make_fetch_def = [SouthParkQuotesMakeFetchDef::class, 'call'];
    $u->make_context = [SouthParkQuotesMakeContext::class, 'call'];
    $u->make_options = [SouthParkQuotesMakeOptions::class, 'call'];
    $u->make_request = [SouthParkQuotesMakeRequest::class, 'call'];
    $u->make_response = [SouthParkQuotesMakeResponse::class, 'call'];
    $u->make_result = [SouthParkQuotesMakeResult::class, 'call'];
    $u->make_point = [SouthParkQuotesMakePoint::class, 'call'];
    $u->make_spec = [SouthParkQuotesMakeSpec::class, 'call'];
    $u->make_url = [SouthParkQuotesMakeUrl::class, 'call'];
    $u->param = [SouthParkQuotesParam::class, 'call'];
    $u->prepare_auth = [SouthParkQuotesPrepareAuth::class, 'call'];
    $u->prepare_body = [SouthParkQuotesPrepareBody::class, 'call'];
    $u->prepare_headers = [SouthParkQuotesPrepareHeaders::class, 'call'];
    $u->prepare_method = [SouthParkQuotesPrepareMethod::class, 'call'];
    $u->prepare_params = [SouthParkQuotesPrepareParams::class, 'call'];
    $u->prepare_path = [SouthParkQuotesPreparePath::class, 'call'];
    $u->prepare_query = [SouthParkQuotesPrepareQuery::class, 'call'];
    $u->result_basic = [SouthParkQuotesResultBasic::class, 'call'];
    $u->result_body = [SouthParkQuotesResultBody::class, 'call'];
    $u->result_headers = [SouthParkQuotesResultHeaders::class, 'call'];
    $u->transform_request = [SouthParkQuotesTransformRequest::class, 'call'];
    $u->transform_response = [SouthParkQuotesTransformResponse::class, 'call'];
});
