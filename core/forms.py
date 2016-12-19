from django import forms
from django.contrib.auth import authenticate, login, logout
from .models import MyUser

class AddLinkForm(forms.Form):
    url = forms.URLField()

class SettingsForm(forms.Form):
    background_choices = [('sepia', 'sepia'), ('bright', 'bright'), ('dark', 'dark')]
    background = forms.ChoiceField(choices=background_choices)
    email = forms.EmailField()

    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        super(SettingsForm, self).__init__(*args, **kwargs)
        self.fields['email'].initial = user.email

class LoginForm(forms.Form):
    email = forms.EmailField(label='Email')
    password = forms.CharField(widget=forms.PasswordInput())

    def clean(self):
        email = self.cleaned_data.get('email')
        password = self.cleaned_data.get('password')
        user = authenticate(email=email, password=password)
        if not user or not user.is_active:
            raise forms.ValidationError('Sorry, that login was invalid. Please try again.')
        return self.cleaned_data

    def auth(self):
        email = self.cleaned_data.get('email')
        password = self.cleaned_data.get('password')
        user = authenticate(email=email, password=password)
        return user

class SignUpForm(forms.Form):
    email = forms.EmailField(label='Email')
    password = forms.CharField(widget=forms.PasswordInput())
    password2 = forms.CharField(widget=forms.PasswordInput())
