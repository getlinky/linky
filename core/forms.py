from django import forms
from django.contrib.auth import authenticate, login, logout

class AddLinkForm(forms.Form):
    url = forms.URLField()

class SettingsForm(forms.Form):
    # background =
    email = forms.EmailField()

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

    def login(self):
        email = self.cleaned_data.get('email')
        password = self.cleaned_data.get('password')
        user = authenticate(email=email, password=password)
        return user

class SignUpForm(forms.Form):
    email = forms.EmailField(label='Email')
    password = forms.CharField(widget=forms.PasswordInput())
    password2 = forms.CharField(widget=forms.PasswordInput())
