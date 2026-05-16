<?php
declare(strict_types=1);

// SouthParkQuotes SDK control

class SouthParkQuotesControl
{
    public mixed $throw_err;
    public mixed $err;
    public mixed $explain;

    public function __construct(array $opts = [])
    {
        $this->throw_err = $opts['throw_err'] ?? null;
        $this->err = null;
        $this->explain = $opts['explain'] ?? null;
    }
}
