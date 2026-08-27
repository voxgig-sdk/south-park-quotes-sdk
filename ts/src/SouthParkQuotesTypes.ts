// Typed models for the SouthParkQuotes SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Quote {
  character: string
  id?: string
  quote: string
}

export interface QuoteLoadMatch {
  id: number
}

export interface QuoteListMatch {
  character?: string
  id?: string
  quote?: string
}

