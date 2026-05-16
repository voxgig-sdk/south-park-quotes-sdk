<?php
declare(strict_types=1);

// SouthParkQuotes SDK base feature

class SouthParkQuotesBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(SouthParkQuotesContext $ctx, array $options): void {}
    public function PostConstruct(SouthParkQuotesContext $ctx): void {}
    public function PostConstructEntity(SouthParkQuotesContext $ctx): void {}
    public function SetData(SouthParkQuotesContext $ctx): void {}
    public function GetData(SouthParkQuotesContext $ctx): void {}
    public function GetMatch(SouthParkQuotesContext $ctx): void {}
    public function SetMatch(SouthParkQuotesContext $ctx): void {}
    public function PrePoint(SouthParkQuotesContext $ctx): void {}
    public function PreSpec(SouthParkQuotesContext $ctx): void {}
    public function PreRequest(SouthParkQuotesContext $ctx): void {}
    public function PreResponse(SouthParkQuotesContext $ctx): void {}
    public function PreResult(SouthParkQuotesContext $ctx): void {}
    public function PreDone(SouthParkQuotesContext $ctx): void {}
    public function PreUnexpected(SouthParkQuotesContext $ctx): void {}
}
