-- Typed models for the SouthParkQuotes SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Quote
---@field character string
---@field quote string

---@class QuoteLoadMatch
---@field id number
---@field search_term string

---@class QuoteListMatch

local M = {}

return M
