# Generated by Django 4.2.1 on 2023-06-16 16:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0012_movie_ratingap_alter_ticket_problem_type_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='status',
            field=models.CharField(choices=[('answered', 'Answered'), ('opened', 'Opened')], default='opened', max_length=200, verbose_name='status'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='quality',
            field=models.CharField(choices=[('SD', 'sd'), ('HD', 'hd'), ('FullHD', 'fullhd')], default='SD', max_length=50, verbose_name='quality'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='status',
            field=models.CharField(choices=[('Not released', 'not released'), ('Canceled', 'canceled'), ('Published', 'published')], default='Not released', max_length=50, verbose_name='status'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='problem_type',
            field=models.CharField(choices=[('disinformation', 'disinformation'), ('quality', 'quality'), ('error', 'error'), ('unacceptable content', 'unacceptable content'), ('other', 'other'), ('loading', 'loading')], max_length=200, verbose_name='problem type'),
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
            name='Rating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stars', models.IntegerField(verbose_name='start')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='created')),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainapp.movie', verbose_name='movie')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='user')),
            ],
            options={
                'verbose_name': 'Rating',
                'verbose_name_plural': 'Ratings',
                'ordering': ['-created'],
            },
        ),
    ]
