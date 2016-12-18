from django.urls import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from .forms import LoginForm, SignUpForm, AddLinkForm
from .models import MyUser, Link

def index(request):
    if request.user.is_authenticated:
        add_link_form = AddLinkForm(request.POST or None)
        if request.POST and add_link_form.is_valid():
            title = 'Test Title, TODO will need to scrape'
            description = 'Test description, TODO'
            url = add_link_form.cleaned_data['url']
            Link.objects.create(title=title, url=url, description=description, user=request.user)
            return HttpResponseRedirect(reverse('index', ))
        else:
            # order by created date and pk, then reverse
            # FIXME: this is only ordering by 'pk' for some reason
            list_items = request.user.link_set.filter(archived=False).order_by('created', 'pk').reverse()
            return render(request, 'core/list.html', {
                'list_items': list_items,
                'add_link_form': add_link_form,
                'page_name': 'list'
            })
    else:
        return render(request, 'core/landing_page.html')

@login_required
def archive(request):
    # FIXME: this is essentially a copy and paste from index
    add_link_form = AddLinkForm(request.POST or None)
    if request.POST and add_link_form.is_valid():
        title = 'Test Title, TODO will need to scrape'
        description = 'Test description, TODO'
        url = add_link_form.cleaned_data['url']
        Link.objects.create(title=title, url=url, description=description, user=request.user)
        return HttpResponseRedirect(reverse('index', ))
    else:
        list_items = request.user.link_set.filter(archived=True).order_by('created', 'pk').reverse()
        return render(request, 'core/list.html', {
            'list_items': list_items,
            'add_link_form': add_link_form,
            'page_name': 'archive'
        })

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
