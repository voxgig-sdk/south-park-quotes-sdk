package voxgigsouthparkquotessdk

import (
	"github.com/voxgig-sdk/south-park-quotes-sdk/go/core"
	"github.com/voxgig-sdk/south-park-quotes-sdk/go/entity"
	"github.com/voxgig-sdk/south-park-quotes-sdk/go/feature"
	_ "github.com/voxgig-sdk/south-park-quotes-sdk/go/utility"
)

// Type aliases preserve external API.
type SouthParkQuotesSDK = core.SouthParkQuotesSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type SouthParkQuotesEntity = core.SouthParkQuotesEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type SouthParkQuotesError = core.SouthParkQuotesError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewQuoteEntityFunc = func(client *core.SouthParkQuotesSDK, entopts map[string]any) core.SouthParkQuotesEntity {
		return entity.NewQuoteEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewSouthParkQuotesSDK = core.NewSouthParkQuotesSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewSouthParkQuotesSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *SouthParkQuotesSDK  { return NewSouthParkQuotesSDK(nil) }
func Test() *SouthParkQuotesSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
