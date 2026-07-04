# frozen_string_literal: true

# Typed models for the SouthParkQuotes SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Quote entity data model.
#
# @!attribute [rw] character
#   @return [String]
#
# @!attribute [rw] quote
#   @return [String]
Quote = Struct.new(
  :character,
  :quote,
  keyword_init: true
)

# Request payload for Quote#load.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] search_term
#   @return [String]
QuoteLoadMatch = Struct.new(
  :id,
  :search_term,
  keyword_init: true
)

# Match filter for Quote#list (any subset of Quote fields).
#
# @!attribute [rw] character
#   @return [String, nil]
#
# @!attribute [rw] quote
#   @return [String, nil]
QuoteListMatch = Struct.new(
  :character,
  :quote,
  keyword_init: true
)

