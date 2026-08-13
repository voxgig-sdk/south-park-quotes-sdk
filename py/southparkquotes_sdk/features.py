# SouthParkQuotes SDK feature factory

from southparkquotes_sdk.feature.base_feature import SouthParkQuotesBaseFeature
from southparkquotes_sdk.feature.test_feature import SouthParkQuotesTestFeature


def _make_feature(name):
    features = {
        "base": lambda: SouthParkQuotesBaseFeature(),
        "test": lambda: SouthParkQuotesTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
