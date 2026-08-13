# SouthParkQuotes SDK utility: make_context

from southparkquotes_sdk.core.context import SouthParkQuotesContext


def make_context_util(ctxmap, basectx):
    return SouthParkQuotesContext(ctxmap, basectx)
