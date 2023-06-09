# Generated by Django 4.2.1 on 2023-06-22 06:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0020_alter_movie_quality_alter_movie_status_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='quality',
            field=models.CharField(choices=[('HD', 'hd'), ('SD', 'sd'), ('FullHD', 'fullhd')], default='SD', max_length=50, verbose_name='quality'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='status',
            field=models.CharField(choices=[('Canceled', 'canceled'), ('Not released', 'not released'), ('Published', 'published')], default='Not released', max_length=50, verbose_name='status'),
        ),
        migrations.AlterField(
            model_name='newscomment',
            name='dislikes',
            field=models.IntegerField(default=0, verbose_name='dislikes'),
        ),
        migrations.AlterField(
            model_name='newscomment',
            name='likes',
            field=models.IntegerField(default=0, verbose_name='likes'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='problem_type',
            field=models.CharField(choices=[('error', 'error'), ('unacceptable content', 'unacceptable content'), ('disinformation', 'disinformation'), ('other', 'other'), ('quality', 'quality'), ('loading', 'loading')], max_length=200, verbose_name='problem type'),
        ),
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(default='Hinata Hyuga', max_length=254, verbose_name='name'),
        ),
        migrations.AlterField(
            model_name='user',
            name='picture',
            field=models.ImageField(default='profile_picture/9.jpg', upload_to='user', verbose_name='profile picture'),
        ),
    ]
