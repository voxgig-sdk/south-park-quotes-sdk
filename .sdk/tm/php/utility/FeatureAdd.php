<?php
declare(strict_types=1);

// SouthParkQuotes SDK utility: feature_add

class SouthParkQuotesFeatureAdd
{
    public static function call(SouthParkQuotesContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
