# Generated by Django 4.2.1 on 2023-06-08 10:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0002_news_alter_movie_quality_alter_movie_status_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='collections',
            name='position',
            field=models.IntegerField(default=10, verbose_name='position'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='quality',
            field=models.CharField(choices=[('SD', 'sd'), ('FullHD', 'fullhd'), ('HD', 'hd')], default='SD', max_length=50, verbose_name='quality'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='problem_type',
            field=models.CharField(choices=[('disinformation', 'disinformation'), ('error', 'error'), ('other', 'other'), ('quality', 'quality'), ('loading', 'loading'), ('unacceptable content', 'unacceptable content')], max_length=200, verbose_name='problem type'),
        ),
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(default='Roy Mustang', max_length=254, verbose_name='name'),
        ),
        migrations.AlterField(
            model_name='user',
            name='phone_number',
            field=models.CharField(blank=True, default='undefined', max_length=15, null=True, verbose_name='phone'),
        ),
        migrations.AlterField(
            model_name='user',
            name='picture',
            field=models.ImageField(default='profile_picture/9.jpg', upload_to='user', verbose_name='profile picture'),
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(verbose_name='text')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='user')),
            ],
        ),
        migrations.CreateModel(
            name='Forum',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='title')),
                ('picture', models.ImageField(null=True, upload_to=None, verbose_name='picture')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='created')),
                ('last_message', models.DateTimeField(auto_now=True, verbose_name='last message')),
                ('messages', models.ManyToManyField(to='mainapp.message', verbose_name='messages')),
                ('participants', models.ManyToManyField(to=settings.AUTH_USER_MODEL, verbose_name='participants')),
            ],
            options={
                'verbose_name': 'Forum',
                'verbose_name_plural': 'Forums',
            },
        ),
    ]
