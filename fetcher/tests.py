import unittest
import responses

try:
    # 1. Required when running via manage.py
    from fetcher.fetcher import fetch
except ImportError:
    # 2. Required when running via python fetcher/tests.py
    from fetcher import fetch

class TestFetcher(unittest.TestCase):
    @responses.activate
    def test_fetch(self):
        body = '''
        <title>Example</title>
        <meta content="An example description" name="description">
        '''
        responses.add(responses.GET, 'http://example.com', body=body, status=200, content_type='application/xml')

        f = fetch('http://example.com')

        self.assertEqual('Example', f.title)
        self.assertEqual('An example description', f.description)

if __name__ == '__main__':
    unittest.main()
