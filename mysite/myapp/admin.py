from django.contrib import admin

from .models import Book
admin.site.register(Book)

from .models import Movie
admin.site.register(Movie)