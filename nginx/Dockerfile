FROM nginx

COPY nginx.conf /etc/nginx/conf.d/
RUN rm /etc/nginx/conf.d/default.conf
RUN cat /etc/nginx/conf.d/nginx.conf
