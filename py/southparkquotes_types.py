# Typed models for the SouthParkQuotes SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Quote:
    character: str
    quote: str


@dataclass
class QuoteLoadMatch:
    id: int
    search_term: str


@dataclass
class QuoteListMatch:
    character: Optional[str] = None
    quote: Optional[str] = None

