import bs4
import requests
from requests import HTTPError

class fetch:
    def __init__(self, URL):
        try:
            response = requests.get(URL, timeout=4)
            response.raise_for_status()
        except:
            raise HTTPError('Error fetching URL: ' + URL)
        self.soup = bs4.BeautifulSoup(response.text, "html.parser")

    @property
    def description(self):
        try:
            return self.soup.findAll(attrs={"name":"description"})[0]['content']
        except:
            return ''

    @property
    def title(self):
        try:
            return self.soup.title.text
        except:
            return ''

