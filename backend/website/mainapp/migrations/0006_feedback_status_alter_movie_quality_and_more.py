# Generated by Django 4.2.1 on 2023-06-13 16:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0005_feedback_created_alter_movie_quality_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedback',
            name='status',
            field=models.CharField(choices=[('closed', 'Closed'), ('opened', 'Opened')], default='opened', max_length=200, verbose_name='status'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='quality',
            field=models.CharField(choices=[('HD', 'hd'), ('SD', 'sd'), ('FullHD', 'fullhd')], default='SD', max_length=50, verbose_name='quality'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='status',
            field=models.CharField(choices=[('Not released', 'not released'), ('Published', 'published'), ('Canceled', 'canceled')], default='Not released', max_length=50, verbose_name='status'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='problem_type',
            field=models.CharField(choices=[('error', 'error'), ('disinformation', 'disinformation'), ('loading', 'loading'), ('quality', 'quality'), ('other', 'other'), ('unacceptable content', 'unacceptable content')], max_length=200, verbose_name='problem type'),
        ),
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(default='Kaneki Ken', max_length=254, verbose_name='name'),
        ),
        migrations.AlterField(
            model_name='user',
            name='picture',
            field=models.ImageField(default='profile_picture/11.jpg', upload_to='user', verbose_name='profile picture'),
        ),
    ]
