# Generated by Django 4.2.1 on 2023-06-16 06:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0010_alter_replies_options_replies_author_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='replies',
            name='dislikes',
            field=models.IntegerField(default=0, verbose_name='dislikes'),
        ),
        migrations.AddField(
            model_name='replies',
            name='likes',
            field=models.IntegerField(default=0, verbose_name='likes'),
        ),
        migrations.AddField(
            model_name='review',
            name='dislikes',
            field=models.IntegerField(default=0, verbose_name='dislikes'),
        ),
        migrations.AddField(
            model_name='review',
            name='likes',
            field=models.IntegerField(default=0, verbose_name='likes'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='quality',
            field=models.CharField(choices=[('HD', 'hd'), ('FullHD', 'fullhd'), ('SD', 'sd')], default='SD', max_length=50, verbose_name='quality'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='status',
            field=models.CharField(choices=[('Published', 'published'), ('Canceled', 'canceled'), ('Not released', 'not released')], default='Not released', max_length=50, verbose_name='status'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='problem_type',
            field=models.CharField(choices=[('loading', 'loading'), ('error', 'error'), ('unacceptable content', 'unacceptable content'), ('other', 'other'), ('quality', 'quality'), ('disinformation', 'disinformation')], max_length=200, verbose_name='problem type'),
        ),
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(default='Monkey D. Luffy', max_length=254, verbose_name='name'),
        ),
        migrations.AlterField(
            model_name='user',
            name='picture',
            field=models.ImageField(default='profile_picture/5.jpg', upload_to='user', verbose_name='profile picture'),
        ),
    ]
