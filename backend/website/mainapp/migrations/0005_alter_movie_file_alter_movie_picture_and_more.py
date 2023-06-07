# Generated by Django 4.2.1 on 2023-05-22 20:23

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0004_carousel_created_carousel_updated_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='file',
            field=models.FileField(upload_to='movies/videos', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['MOV', 'avi', 'mp4', 'webm', 'mkv'])], verbose_name='file'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='picture',
            field=models.ImageField(upload_to='movies/pictures', verbose_name='picture'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='quality',
            field=models.CharField(choices=[('SD', 'sd'), ('FullHD', 'fullhd'), ('HD', 'hd')], default='SD', max_length=50, verbose_name='quality'),
        ),
        migrations.AlterField(
            model_name='user',
            name='picture',
            field=models.ImageField(default='../static/profile_pictures/9.png', upload_to='user/<django.db.models.fields.CharField>', verbose_name='profile picture'),
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('problem_type', models.CharField(choices=[('loading', 'loading'), ('unacceptable content', 'unacceptable content'), ('error', 'error'), ('disinformation', 'disinformation'), ('quality', 'quality'), ('other', 'other')], max_length=200, verbose_name='problem type')),
                ('problem_text', models.TextField(verbose_name='problem text')),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainapp.movie', verbose_name='movie')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainapp.user', verbose_name='user')),
            ],
        ),
    ]
