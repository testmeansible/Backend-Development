from django.shortcuts import render
from django.shortcuts import HttpResponse, HttpResponseRedirect
from django.urls import reverse
# Create your views here.
def helloWorld(request):
    return HttpResponse("hello world!")

def post(request, id):
    return render (request, "post.html")

def home(request):
    return render(request,"home.html", {"posts":posts})

posts = [
    {"id": 1, "Title": "first title", "content": "this is the first post's text"},
    {"id": 2, "Title": "second title", "content": "this is the second post's text"},
    {"id": 3, "Title": "third post", "content": "this is the third post's text"},
    # You can add more dictionaries (posts) to this list
]
