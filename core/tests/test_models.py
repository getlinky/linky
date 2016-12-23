from django.test import TestCase

from core.models import MyUser

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

    def test_adding_links_to_user(self):
        email = 'test@testing.com'
        raw_password = 'testingpassword'
        user = MyUser.objects.create(email=email)
        user.set_password(raw_password)

        # make sure the links are mepty
        self.assertEquals(len(user.link_set.all()), len(user.link_set.none()))
        title = 'Example Title'
        url = 'http://example.com'
        description = 'An example description'
        user.link_set.create(title=title, url=url, description=description)
        self.assertNotEqual(user.link_set.first(), user.link_set.none())
