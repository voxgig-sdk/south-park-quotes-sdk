<?php
declare(strict_types=1);

// SouthParkQuotes SDK utility: make_fetch_def

require_once __DIR__ . '/../core/Result.php';

class SouthParkQuotesMakeFetchDef
{
    public static function call(SouthParkQuotesContext $ctx): array
    {
        $spec = $ctx->spec;
        if (!$spec) {
            return [null, $ctx->make_error('fetchdef_no_spec', 'Expected context spec property to be defined.')];
        }

        if (!$ctx->result) {
            $ctx->result = new SouthParkQuotesResult([]);
        }
        $spec->step = 'prepare';

        [$url, $err] = ($ctx->utility->make_url)($ctx);
        if ($err) {
            return [null, $err];
        }

        $spec->url = $url;

        $fetchdef = ['url' => $url, 'method' => $spec->method, 'headers' => $spec->headers];
        if ($spec->body !== null) {
            $fetchdef['body'] = is_array($spec->body) ? \Voxgig\Struct\Struct::jsonify($spec->body) : $spec->body;
        }

        return [$fetchdef, null];
    }
}
