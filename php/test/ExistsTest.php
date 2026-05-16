<?php
declare(strict_types=1);

// SouthParkQuotes SDK exists test

require_once __DIR__ . '/../southparkquotes_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = SouthParkQuotesSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
