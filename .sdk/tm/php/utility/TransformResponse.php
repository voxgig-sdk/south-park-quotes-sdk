<?php
declare(strict_types=1);

// SouthParkQuotes SDK utility: transform_response

require_once __DIR__ . '/../core/Helpers.php';

class SouthParkQuotesTransformResponse
{
    public static function call(SouthParkQuotesContext $ctx): mixed
    {
        $spec = $ctx->spec;
        $result = $ctx->result;
        $point = $ctx->point;
        if ($spec) {
            $spec->step = 'resform';
        }
        if ($result === null || !$result->ok) {
            return null;
        }
        $transform = SouthParkQuotesHelpers::to_map(\Voxgig\Struct\Struct::getprop($point, 'transform'));
        if (!$transform) {
            return null;
        }
        $resform = \Voxgig\Struct\Struct::getprop($transform, 'res');
        if (!$resform) {
            return null;
        }
        $resdata = \Voxgig\Struct\Struct::transform([
            'ok' => $result->ok,
            'status' => $result->status,
            'statusText' => $result->status_text,
            'headers' => $result->headers,
            'body' => $result->body,
            'err' => $result->err,
            'resdata' => $result->resdata,
            'resmatch' => $result->resmatch,
        ], $resform);
        $result->resdata = $resdata;
        return $resdata;
    }
}
