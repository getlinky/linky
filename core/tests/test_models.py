from django.test import TestCase
import responses

from core.models import MyUser, Link

class UserModelTests(TestCase):

    def setUp(self):
        self.email = 'test@testing.com'
        self.raw_password = 'testingpassword'
        self.user = MyUser.objects.create(email=self.email)
        self.user.set_password(self.raw_password)

    def test_user_password_is_hashed(self):
        self.assertNotEqual(self.user.password, self.raw_password)


    def test_user_email_is_saved(self):
        self.assertEqual(self.user.email, self.email)

    def test_user_permissions(self):
        '''
        Ensure that permssions such as is_admin, is_staff, is_superuser,
        is_active, are set correctly with user creation
        '''
        self.assertFalse(self.user.is_admin)
        self.assertFalse(self.user.is_superuser)
        self.assertFalse(self.user.is_staff)
        self.assertTrue(self.user.is_active)

    def test_setting_user_inactive(self):
        self.user.is_active = False
        self.assertFalse(self.user.is_active)

    def test_setting_user_admin_superuser(self):
        self.user.is_admin = True
        self.assertTrue(self.user.is_admin)
        self.user.is_superuser = True
        self.assertTrue(self.user.is_superuser)

    def test_setting_user_is_staff_property(self):
        self.user.is_admin = True
        self.assertTrue(self.user.is_staff)


class LinkModelTests(TestCase):

    def setUp(self):

        email = 'test@testing.com'
        raw_password = 'testingpassword'
        user = MyUser(email=email)
        user.set_password(raw_password)
        user.save()
        self.user = user

    def test_adding_links_to_user(self):
        # make sure the links are mepty
        self.assertEquals(len(self.user.link_set.all()), len(self.user.link_set.none()))
        title = 'Example Title'
        url = 'http://example.com'
        description = 'An example description'
        self.user.link_set.create(title=title, url=url, description=description)
        self.assertNotEqual(self.user.link_set.first(), self.user.link_set.none())

    @responses.activate
    def test_creating_link_without_title_or_description(self):
        '''
        Test the creation of a Link without a title or description passed as an
        argument. Expect that the website has a description and title.
        '''
        body = '''
        <title>Example Title</title>
        <meta content="An example description" name="description">
        '''
        responses.add(responses.GET,
                      'http://example.com',
                      body=body,
                      status=200,
                      content_type='text/html')

        l = Link(user=self.user, url='http://example.com')
        l.save()

        title = 'Example Title'
        self.assertEquals(title, l.title)
        description = 'An example description'
        self.assertEquals(description, l.description)

    @responses.activate
    def test_creating_link_without_link_or_description_on_page(self):
        '''
        Creating a link without the link or descrption being part of the page.
        '''
        responses.add(responses.GET,
                      'http://example.com',
                      body='',
                      status=200,
                      content_type='text/html')

        l = Link(user=self.user, url='http://example.com')
        l.save()

        title = ''
        self.assertEquals(title, l.title)
        description = ''
        self.assertEquals(description, l.description)


    @responses.activate
    def test_creating_link_with_404_url(self):
        '''
        Creating a link with URL that 404s
        '''
        responses.add(responses.GET,
                      'http://example.com',
                      body='',
                      status=404,
                      content_type='text/html')

        l = Link(user=self.user, url='http://example.com')
        l.save()

        title = ''
        self.assertEquals(title, l.title)
        description = ''
        self.assertEquals(description, l.description)
