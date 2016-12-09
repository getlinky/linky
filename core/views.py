from django.urls import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import render

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
    return render(request, 'core/list.html', {'list_items': list_items, 'page': 'list', 'title': 'List'})

def archive(request):
    return render(request, 'core/archive.html', {'list_items': list_items, 'page': 'archive', 'title': 'Archive'})

def logout(request):
    # TODO
    return HttpResponseRedirect(reverse('index', ))
