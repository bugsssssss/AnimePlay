# Generated by Django 4.2.1 on 2023-05-22 19:56

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0003_rename_video_movie_file_alter_movie_quality_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='carousel',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='created'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='carousel',
            name='updated',
            field=models.DateField(auto_now=True, verbose_name='updated'),
        ),
        migrations.AddField(
            model_name='permissions',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='created'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='permissions',
            name='updated',
            field=models.DateField(auto_now=True, verbose_name='updated'),
        ),
        migrations.AddField(
            model_name='role',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='created'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='role',
            name='updated',
            field=models.DateField(auto_now=True, verbose_name='updated'),
        ),
        migrations.AlterField(
            model_name='actor',
            name='movies',
            field=models.ManyToManyField(blank=True, null=True, to='mainapp.movie', verbose_name='movies'),
        ),
        migrations.AlterField(
            model_name='carousel',
            name='description',
            field=models.TextField(blank=True, null=True, verbose_name='description'),
        ),
        migrations.AlterField(
            model_name='carousel',
            name='title',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='category',
            name='info',
            field=models.TextField(blank=True, null=True, verbose_name='category info'),
        ),
        migrations.AlterField(
            model_name='category',
            name='picture',
            field=models.ImageField(blank=True, null=True, upload_to='categories', verbose_name='category picture'),
        ),
        migrations.AlterField(
            model_name='director',
            name='movies',
            field=models.ManyToManyField(blank=True, null=True, to='mainapp.movie', verbose_name='movies'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='actors',
            field=models.ManyToManyField(blank=True, null=True, to='mainapp.actor', verbose_name='actors'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='budget',
            field=models.IntegerField(blank=True, null=True, verbose_name='budget'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='categories',
            field=models.ManyToManyField(blank=True, null=True, to='mainapp.category', verbose_name='categories'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='description',
            field=models.TextField(blank=True, null=True, verbose_name='description'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='directors',
            field=models.ManyToManyField(blank=True, null=True, to='mainapp.director', verbose_name='director'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='file',
            field=models.FileField(upload_to='videos/<django.db.models.fields.CharField>', verbose_name='file'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='genres',
            field=models.ManyToManyField(blank=True, null=True, to='mainapp.genre', verbose_name='genres'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='relesased',
            field=models.DateField(verbose_name='released'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='title_eng',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='english title'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='title_rus',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='russian title'),
        ),
        migrations.AlterField(
            model_name='role',
            name='info',
            field=models.TextField(blank=True, null=True, verbose_name='Info'),
        ),
        migrations.AlterField(
            model_name='role',
            name='permissions',
            field=models.ManyToManyField(blank=True, null=True, to='mainapp.permissions', verbose_name='Permissions'),
        ),
        migrations.AlterField(
            model_name='user',
            name='about',
            field=models.TextField(blank=True, null=True, verbose_name='about'),
        ),
        migrations.AlterField(
            model_name='user',
            name='balance',
            field=models.IntegerField(blank=True, null=True, verbose_name='balance'),
        ),
        migrations.AlterField(
            model_name='user',
            name='carma',
            field=models.IntegerField(blank=True, null=True, verbose_name='carma'),
        ),
        migrations.AlterField(
            model_name='user',
            name='date_of_birth',
            field=models.DateField(verbose_name='date of birth'),
        ),
        migrations.AlterField(
            model_name='user',
            name='picture',
            field=models.ImageField(default='../static/profile_pictures/11.png', upload_to='user/<django.db.models.fields.CharField>', verbose_name='profile picture'),
        ),
    ]
