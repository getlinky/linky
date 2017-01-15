FROM nginx
WORKDIR var
RUN mkdir www
COPY index.html /var/www/
COPY nginx.conf /etc/nginx/conf.d/
RUN rm /etc/nginx/conf.d/default.conf
