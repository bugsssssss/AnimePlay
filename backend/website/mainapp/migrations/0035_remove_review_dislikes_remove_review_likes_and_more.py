# Generated by Django 4.2.1 on 2023-06-30 19:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0034_review_disliked_review_liked_alter_movie_quality_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='dislikes',
        ),
        migrations.RemoveField(
            model_name='review',
            name='likes',
        ),
        migrations.AlterField(
            model_name='movie',
            name='status',
            field=models.CharField(choices=[('Published', 'published'), ('Canceled', 'canceled'), ('Not released', 'not released')], default='Not released', max_length=50, verbose_name='status'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='problem_type',
            field=models.CharField(choices=[('unacceptable content', 'unacceptable content'), ('loading', 'loading'), ('error', 'error'), ('quality', 'quality'), ('disinformation', 'disinformation'), ('other', 'other')], max_length=200, verbose_name='problem type'),
        ),
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(default='Gon Freecss', max_length=254, verbose_name='name'),
        ),
        migrations.AlterField(
            model_name='user',
            name='picture',
            field=models.ImageField(default='profile_picture/2.jpg', upload_to='user', verbose_name='profile picture'),
        ),
    ]