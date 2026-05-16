<?php
declare(strict_types=1);

// SouthParkQuotes SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class SouthParkQuotesMakeContext
{
    public static function call(array $ctxmap, ?SouthParkQuotesContext $basectx): SouthParkQuotesContext
    {
        return new SouthParkQuotesContext($ctxmap, $basectx);
    }
}
