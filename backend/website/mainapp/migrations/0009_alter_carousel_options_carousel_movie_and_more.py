# Generated by Django 4.2.1 on 2023-05-26 08:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0008_movie_manga_movie_ratingimdb_movie_ratingkp_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='carousel',
            options={'ordering': ['position'], 'verbose_name': 'Carousel', 'verbose_name_plural': 'Carousels'},
        ),
        migrations.AddField(
            model_name='carousel',
            name='movie',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='mainapp.movie', verbose_name='movie'),
        ),
        migrations.AddField(
            model_name='carousel',
            name='position',
            field=models.IntegerField(default=10, verbose_name='position'),
        ),
        migrations.AlterField(
            model_name='movie',
            name='status',
            field=models.CharField(choices=[('Not released', 'not released'), ('Canceled', 'canceled'), ('Published', 'published')], default='Not released', max_length=50, verbose_name='status'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='problem_type',
            field=models.CharField(choices=[('quality', 'quality'), ('other', 'other'), ('loading', 'loading'), ('unacceptable content', 'unacceptable content'), ('disinformation', 'disinformation'), ('error', 'error')], max_length=200, verbose_name='problem type'),
        ),
        migrations.AlterField(
            model_name='user',
            name='picture',
            field=models.ImageField(default='../static/profile_pictures/4.png', upload_to='user/<django.db.models.fields.CharField>', verbose_name='profile picture'),
        ),
    ]