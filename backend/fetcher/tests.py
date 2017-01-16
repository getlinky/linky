import unittest
import responses

try:
    # 1. Required when running via manage.py
    from fetcher.fetcher import fetch, HTTPError
except ImportError:
    # 2. Required when running via python fetcher/tests.py
    from fetcher import fetch, HTTPError


class TestFetcher(unittest.TestCase):
    @responses.activate
    def test_fetch_recieves_data(self):
        '''
        Fetch with a domain that has both a title and a description
        '''
        body = '''
        <title>Example</title>
        <meta content="An example description" name="description">
        '''
        responses.add(responses.GET,
                      'http://example.com',
                      body=body,
                      status=200,
                      content_type='text/html')

        f = fetch('http://example.com')

        self.assertEqual('Example', f.title)
        self.assertEqual('An example description', f.description)

    @responses.activate
    def test_fetch_without_data(self):
        '''
        Fetch with a domain that doesn't have a title or description
        '''
        responses.add(responses.GET,
                      'http://example.com',
                      body='',
                      status=200,
                      content_type='text/html')

        f = fetch('http://example.com')

        self.assertEqual('', f.title)
        self.assertEqual('', f.description)

    @responses.activate
    def test_fetch_bad_status_code(self):
        '''
        Fetch a URL that returns a bad status code
        '''
        responses.add(responses.GET,
                      'http://example.com',
                      status=404,
                      content_type='text/html')
        with self.assertRaises(HTTPError):
            fetch('http://example.com')

if __name__ == '__main__':
    unittest.main()
