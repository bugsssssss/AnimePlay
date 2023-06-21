# Generated by Django 4.2.1 on 2023-06-20 04:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0015_collections_created_alter_movie_quality_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='news',
            name='author',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='author'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='movie',
            name='quality',
            field=models.CharField(choices=[('FullHD', 'fullhd'), ('HD', 'hd'), ('SD', 'sd')], default='SD', max_length=50, verbose_name='quality'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='status',
            field=models.CharField(choices=[('Not released', 'not released'), ('Published', 'published'), ('Canceled', 'canceled')], default='Not released', max_length=50, verbose_name='status'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='problem_type',
            field=models.CharField(choices=[('quality', 'quality'), ('disinformation', 'disinformation'), ('error', 'error'), ('unacceptable content', 'unacceptable content'), ('other', 'other'), ('loading', 'loading')], max_length=200, verbose_name='problem type'),
        ),
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(default='Riza Hawkeye', max_length=254, verbose_name='name'),
        ),
        migrations.AlterField(
            model_name='user',
            name='picture',
            field=models.ImageField(default='profile_picture/4.jpg', upload_to='user', verbose_name='profile picture'),
        ),
    ]
