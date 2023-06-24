# Generated by Django 4.2.1 on 2023-06-22 06:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0016_news_author_alter_movie_quality_alter_movie_status_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='news',
            options={'ordering': ['-id'], 'verbose_name': 'News', 'verbose_name_plural': 'News'},
        ),
        migrations.AlterModelOptions(
            name='user',
            options={'ordering': ['-created'], 'verbose_name': 'User', 'verbose_name_plural': 'Users'},
        ),
        migrations.AlterField(
            model_name='movie',
            name='quality',
            field=models.CharField(choices=[('HD', 'hd'), ('SD', 'sd'), ('FullHD', 'fullhd')], default='SD', max_length=50, verbose_name='quality'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='status',
            field=models.CharField(choices=[('Canceled', 'canceled'), ('Published', 'published'), ('Not released', 'not released')], default='Not released', max_length=50, verbose_name='status'),
        ),
        migrations.AlterField(
            model_name='news',
            name='picture',
            field=models.CharField(blank=True, max_length=100, verbose_name='picture'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='problem_type',
            field=models.CharField(choices=[('error', 'error'), ('other', 'other'), ('loading', 'loading'), ('unacceptable content', 'unacceptable content'), ('disinformation', 'disinformation'), ('quality', 'quality')], max_length=200, verbose_name='problem type'),
        ),
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(default='Rei Ayanami', max_length=254, verbose_name='name'),
        ),
        migrations.AlterField(
            model_name='user',
            name='picture',
            field=models.ImageField(default='profile_picture/3.jpg', upload_to='user', verbose_name='profile picture'),
        ),
        migrations.CreateModel(
            name='NewsComment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(verbose_name='text')),
                ('likes', models.IntegerField(verbose_name='likes')),
                ('dislikes', models.IntegerField(verbose_name='dislikes')),
                ('createad', models.DateTimeField(auto_now_add=True, verbose_name='created')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='author')),
                ('news', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainapp.news', verbose_name='news')),
            ],
            options={
                'verbose_name': 'NewsComment',
                'verbose_name_plural': 'NewsComments',
            },
        ),
    ]