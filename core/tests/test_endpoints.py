from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

from core.models import MyUser

from collections import OrderedDict


class TestEndPoints(TestCase):
    def setUp(self):
        client = APIClient()

        self.email = 'testing@testexample.com'
        self.password = 'testing123'
        u = MyUser.objects.create(email=self.email)
        u.set_password(self.password)
        u.save()
        self.user = u

    def test_user_login(self):
        '''
        sessions based login works
        '''
        is_authenticated = self.client.login(
            email=self.email, password=self.password)
        self.assertTrue(is_authenticated)

    def test_root_unauthenticated(self):
        '''
        / is avaliable to unauthenticated users and resturns a meaningful response
        '''
        res = self.client.get('/api/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, {'users': 'http://testserver/api/users/',
                                    'links': 'http://testserver/api/links/'})

    def test_users_unauthenticated(self):
        '''
        /users/ route is not avaliable to unauthenticated users
        '''
        res = self.client.get('/api/users/')
        # Note: this should be a 401 but django returns a 403
        # see: http://stackoverflow.com/a/26608178
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(
            res.data,
            {'detail': 'Authentication credentials were not provided.'})

    def test_links_unauthenticated(self):
        '''
        /link/ route should not be available to unauthenticated users
        '''
        res = self.client.get('/api/links/')
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(
            res.data,
            {'detail': 'Authentication credentials were not provided.'})

    def test_users_authenticated(self):
        '''
        /users/ should not be accessable to normal, authenticated users
        '''
        client = APIClient()
        client.force_authenticate(user=self.user)
        res = client.get('/api/users/')
        # Note: this should be a 401 but django returns a 403
        # see: http://stackoverflow.com/a/26608178
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(
            res.data,
            {'detail': 'You do not have permission to perform this action.'})

    def test_links_authenticated(self):
        '''
        /links/ should be accesable to authenticated users
        '''
        client = APIClient()
        client.force_authenticate(user=self.user)
        res = client.get('/api/links/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, [])
        title = 'Example Title'
        url = 'http://example.com'
        description = 'An example.'
        self.user.link_set.create(
            title=title, url=url, description=description)
        res = client.get('/api/links/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        expected_data = [OrderedDict(
            [('title', 'Example Title'), ('url', 'http://example.com'),
             ('description', 'An example.'), ('archived', False),
             ('created', '2016-12-23'), ('last_updated', '2016-12-23'),
             ('id', 1)])]
        self.assertEqual(res.data, expected_data)

    def test_users_me_authenticated(self):
        '''
        /users/me should return relevent data about the currently authenticated
        user and also check that unauthenticated users cannot access the
        endpoint
        '''
        client = APIClient()
        res = client.get('/api/users/me/')
        self.assertEqual(res.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(
            res.data,
            {'detail': 'Authentication credentials were not provided.'})
        client.force_authenticate(user=self.user)
        res = client.get('/api/users/me/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, {'email': self.email,
                                    'password': self.user.password})

    def test_users_superuser(self):
        '''
        /users/ should return all of the users if a user is a superuser
        '''
        # Note: the permissions are currently setup to only check the
        # is_superuser
        email = 'superuser@testexample.com'
        password = 'testing123'
        u = MyUser.objects.create(email=email)
        u.set_password(password)
        u.is_superuser = True
        u.save()
        client = APIClient()
        client.force_authenticate(user=u)
        res = client.get('/api/users/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        number_of_users = 2
        self.assertEqual(len(res.data), number_of_users)

    def test_links_index(self):
        '''
        /users/1/ if authed, should return a 404 if it isn't the current user's link
        if the user is unauthenticated it should give a auth error
        '''
        # 1. Add a link to the setUp user
        title = 'Example Title'
        url = 'http://example.com'
        description = 'An example.'
        password = 'testing123'
        self.user.link_set.create(
            title=title, url=url, description=description)

        # 2. create a second plain user
        email = 'superuser@testexample.com'
        u = MyUser.objects.create(email=email)
        u.set_password(password)
        u.is_superuser = True
        u.save()

        # 3. create superuser
        email = 'plainuser2@testexample.com'
        plain = MyUser.objects.create(email=email)
        plain.set_password(password)
        plain.save()

        # 4. connect with default user and try to index
        client = APIClient()
        client.force_authenticate(user=plain)
        res = client.get('/api/links/1/')
        self.assertEqual(res.status_code, status.HTTP_404_NOT_FOUND)

        # 5. check that the setup user can acccess the item
        client = APIClient()
        client.force_authenticate(user=self.user)
        res = client.get('/api/links/1/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)

        # 6. check that the super user can access the item
        client = APIClient()
        client.force_authenticate(user=u)
        res = client.get('/api/links/1/')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
