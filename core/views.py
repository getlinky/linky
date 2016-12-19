from django.urls import reverse
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core import serializers

from .forms import LoginForm, SignUpForm, AddLinkForm, SettingsForm
from .models import MyUser, Link, Settings


def proccess_index_archive(request, list=True):
    isArchive = not list
    add_link_form = AddLinkForm(request.POST or None)
    settings_form = SettingsForm(request.POST or None, user=request.user)
    if request.POST and add_link_form.is_valid():
        title = 'Test Title, TODO will need to scrape'
        description = 'Test description, TODO'
        url = add_link_form.cleaned_data['url']
        Link.objects.create(title=title, url=url, description=description, user=request.user)
        return HttpResponseRedirect(reverse('index', ))
    elif request.POST and settings_form.is_valid():
        background = settings_form.cleaned_data['background']
        email = settings_form.cleaned_data['email']
        user = MyUser.objects.get(email=request.user.email)
        user.email = email
        user.save()
        settings = Settings.objects.get(user=user)
        settings.background = background
        settings.save()
        return HttpResponseRedirect(reverse('index', ))
    else:
        # order by created date and pk, then reverse
        # FIXME: this is only ordering by 'pk' for some reason
        list_items = request.user.link_set.filter(archived=isArchive).order_by('created', 'pk').reverse()
        return render(request, 'core/list.html', {
            'list_items': list_items,
            'add_link_form': add_link_form,
            'settings_form': settings_form,
            'page_name': 'list' if list else 'archive'
        })

def index(request):
    if request.user.is_authenticated:
        return proccess_index_archive(request)
    else:
        return render(request, 'core/landing_page.html')

@login_required
def archive(request):
    return proccess_index_archive(request, list=False)

@login_required
def download_links_json(request):
    links = request.user.link_set.all()
    d = [obj.as_dict() for obj in links]
    # set safe=False in order to be able to jsonify non dict() objects
    return JsonResponse(d, safe=False)

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('index', ))

def login_view(request):
    form = LoginForm(request.POST or None)
    if request.POST and form.is_valid():
        user = form.auth()
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse('index',))
    return render(request, 'core/login_form.html', {'form': form})

def signup(request):
    form = SignUpForm(request.POST or None)
    if request.POST and form.is_valid():
        email = form.cleaned_data['email']
        password = form.cleaned_data['password']
        password2 = form.cleaned_data['password2']
        if password == password2:
            user = MyUser.objects.create_user(email=email, password=password)
            login(request, user)
            return HttpResponseRedirect(reverse('index',))
        else:
            return render(request, 'core/signup_form.html', {'form': form})
    return render(request, 'core/signup_form.html', {'form': form})
