# SouthParkQuotes SDK feature factory

from southparkquotes_sdk.feature.base_feature import SouthParkQuotesBaseFeature
from southparkquotes_sdk.feature.ratelimit_feature import SouthParkQuotesRatelimitFeature
from southparkquotes_sdk.feature.retry_feature import SouthParkQuotesRetryFeature
from southparkquotes_sdk.feature.test_feature import SouthParkQuotesTestFeature
from southparkquotes_sdk.feature.timeout_feature import SouthParkQuotesTimeoutFeature


_FEATURES = {
    "base": lambda: SouthParkQuotesBaseFeature(),
    "ratelimit": lambda: SouthParkQuotesRatelimitFeature(),
    "retry": lambda: SouthParkQuotesRetryFeature(),
    "test": lambda: SouthParkQuotesTestFeature(),
    "timeout": lambda: SouthParkQuotesTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
