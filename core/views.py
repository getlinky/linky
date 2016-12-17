from django.urls import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout

from .forms import LoginForm, SignUpForm
from .models import MyUser

list_items = [{'title': 'test',
    'source': 'https://google.com',
    'description': 'balh blah blah'},
    {'title': 'bah', 'source': 'https://rust-lang.org', 'description': 'lsdjfl lsdjf lsdfj '},
    {'title': 'test',
        'source': 'https://google.com',
        'description': 'balh blah blah'},
    {'title': 'bah', 'source': 'https://rust-lang.org', 'description': 'lsdjfl lsdjf lsdfj '},
    {'title': 'test',
        'source': 'https://google.com',
        'description': 'balh blah blah'},
    {'title': 'bah', 'source': 'https://rust-lang.org', 'description': 'lsdjfl lsdjf lsdfj '},
    {'title': 'test',
        'source': 'https://google.com',
        'description': 'balh blah blah'},
    {'title': 'bah', 'source': 'https://rust-lang.org', 'description': 'lsdjfl lsdjf lsdfj '}]

def index(request):
    if request.user.is_authenticated:
        return render(request, 'core/list.html', {'list_items': list_items, 'page': 'list', 'title': 'List'})
    else:
        return render(request, 'core/landing_page.html')

def archive(request):
    return render(request, 'core/archive.html', {'list_items': list_items, 'page': 'archive', 'title': 'Archive'})

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('index', ))

def login_view(request):
    form = LoginForm(request.POST or None)
    if request.POST and form.is_valid():
        user = form.login()
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse('index',))
    return render(request, 'core/login_form.html', {'form': form})

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            password2 = form.cleaned_data['password2']
            if password is password2:
                user = MyUser.objects.create_user(email=email, password=password)
                return HttpResponseRedirect(reverse('index',))
            else:
                return render(request, 'core/signup_form.html', {'form': form})
    else:
        form = LoginForm()
    return render(request, 'core/signup_form.html', {'form': form})
