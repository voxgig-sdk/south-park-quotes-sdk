<?php
declare(strict_types=1);

// SouthParkQuotes SDK utility: prepare_body

class SouthParkQuotesPrepareBody
{
    public static function call(SouthParkQuotesContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
