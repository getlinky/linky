# wait for database - https://www.stavros.io/posts/how-deploy-django-docker/
while ! nc -w 1 -z db 5432
    do sleep 0.1
done
python manage.py collectstatic --noinput
python manage.py migrate
gunicorn -w 3 -b 0.0.0.0:8000 linky.wsgi
