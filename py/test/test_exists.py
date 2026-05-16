# ProjectName SDK exists test

import pytest
from southparkquotes_sdk import SouthParkQuotesSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = SouthParkQuotesSDK.test(None, None)
        assert testsdk is not None
