package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewQuoteEntityFunc func(client *SouthParkQuotesSDK, entopts map[string]any) SouthParkQuotesEntity

