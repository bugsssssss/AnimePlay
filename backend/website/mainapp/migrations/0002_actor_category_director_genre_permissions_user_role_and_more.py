# Generated by Django 4.2.1 on 2023-05-22 19:45

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Actor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=255, verbose_name='full name')),
                ('info', models.TextField(blank=True, null=True, verbose_name='actor info')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='created')),
                ('updated', models.DateField(auto_now=True, verbose_name='updated')),
            ],
            options={
                'verbose_name': 'Actor',
                'verbose_name_plural': 'Actors',
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='name')),
                ('picture', models.ImageField(upload_to='categories', verbose_name='category picture')),
                ('info', models.TextField(verbose_name='category info')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='created')),
                ('updated', models.DateField(auto_now=True, verbose_name='updated')),
            ],
            options={
                'verbose_name': 'Category',
                'verbose_name_plural': 'Categories',
            },
        ),
        migrations.CreateModel(
            name='Director',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=255, verbose_name='full name')),
                ('info', models.TextField(blank=True, null=True, verbose_name='actor info')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='created')),
                ('updated', models.DateField(auto_now=True, verbose_name='updated')),
            ],
            options={
                'verbose_name': 'Director',
                'verbose_name_plural': 'Directors',
            },
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, verbose_name='genre')),
                ('info', models.TextField(blank=True, null=True, verbose_name='info')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='created')),
                ('updated', models.DateField(auto_now=True, verbose_name='updated')),
            ],
            options={
                'verbose_name': 'Genre',
                'verbose_name_plural': 'Genres',
            },
        ),
        migrations.CreateModel(
            name='Permissions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='name')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=254, verbose_name='name')),
                ('username', models.CharField(max_length=255, unique=True, verbose_name='username')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email')),
                ('picture', models.ImageField(default='../static/profile_pictures/3.png', upload_to='user/<django.db.models.fields.CharField>', verbose_name='profile picture')),
                ('phone_number', models.CharField(max_length=15, verbose_name='phone')),
                ('date_of_birth', models.DateTimeField(verbose_name='date of birth')),
                ('balance', models.IntegerField(verbose_name='balance')),
                ('carma', models.IntegerField(verbose_name='carma')),
                ('about', models.TextField(verbose_name='about')),
                ('logged', models.DateTimeField(auto_now=True, verbose_name='last seen')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='created')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='updated')),
            ],
            options={
                'verbose_name': 'User',
                'verbose_name_plural': 'Users',
            },
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_type', models.CharField(max_length=100, verbose_name='Type')),
                ('info', models.TextField(verbose_name='Info')),
                ('permissions', models.ManyToManyField(to='mainapp.permissions', verbose_name='Permissions')),
            ],
            options={
                'verbose_name': 'Role',
                'verbose_name_plural': 'Roles',
            },
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title_original', models.CharField(max_length=255, verbose_name='original title')),
                ('title_rus', models.CharField(max_length=255, null=True, verbose_name='russian title')),
                ('title_eng', models.CharField(max_length=255, null=True, verbose_name='english title')),
                ('relesased', models.DateTimeField(verbose_name='released')),
                ('picture', models.ImageField(upload_to='movies/<django.db.models.fields.CharField>', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['MOV', 'avi', 'mp4', 'webm', 'mkv'])], verbose_name='picture')),
                ('age', models.IntegerField(default=16, verbose_name='age')),
                ('description', models.TextField(verbose_name='description')),
                ('quality', models.CharField(choices=[('FullHD', 'fullhd'), ('SD', 'sd'), ('HD', 'hd')], default='SD', max_length=50, verbose_name='quality')),
                ('budget', models.IntegerField(verbose_name='budget')),
                ('video', models.FileField(upload_to='videos/<django.db.models.fields.CharField>', verbose_name='video')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='created')),
                ('updated', models.DateField(auto_now=True, verbose_name='updated')),
                ('actors', models.ManyToManyField(to='mainapp.actor', verbose_name='actors')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainapp.user', verbose_name='author')),
                ('categories', models.ManyToManyField(to='mainapp.category', verbose_name='categories')),
                ('directors', models.ManyToManyField(to='mainapp.director', verbose_name='director')),
                ('genres', models.ManyToManyField(to='mainapp.genre', verbose_name='genres')),
            ],
            options={
                'verbose_name': 'Movie',
                'verbose_name_plural': 'Movies',
            },
        ),
        migrations.AddField(
            model_name='director',
            name='movies',
            field=models.ManyToManyField(to='mainapp.movie', verbose_name='movies'),
        ),
        migrations.AddField(
            model_name='actor',
            name='movies',
            field=models.ManyToManyField(to='mainapp.movie', verbose_name='movies'),
        ),
    ]