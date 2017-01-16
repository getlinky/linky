FROM python:3.6
ENV PYTHONUNBUFFERD 1
RUN apt-get update
RUN apt-get install netcat -y
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip3 install -r requirements.txt
COPY . /code/
RUN python3 manage.py collectstatic --noinput
