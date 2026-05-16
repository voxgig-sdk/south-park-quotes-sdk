<?php
declare(strict_types=1);

// SouthParkQuotes SDK utility: result_headers

class SouthParkQuotesResultHeaders
{
    public static function call(SouthParkQuotesContext $ctx): ?SouthParkQuotesResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
