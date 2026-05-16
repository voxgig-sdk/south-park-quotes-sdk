<?php
declare(strict_types=1);

// SouthParkQuotes SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class SouthParkQuotesFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new SouthParkQuotesBaseFeature();
            case "test":
                return new SouthParkQuotesTestFeature();
            default:
                return new SouthParkQuotesBaseFeature();
        }
    }
}
