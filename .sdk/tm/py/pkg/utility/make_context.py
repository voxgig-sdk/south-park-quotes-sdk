# SouthParkQuotes SDK utility: make_context

from projectname_sdk.core.context import SouthParkQuotesContext


def make_context_util(ctxmap, basectx):
    return SouthParkQuotesContext(ctxmap, basectx)
