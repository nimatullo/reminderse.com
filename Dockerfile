FROM nginx:1.16.0-alpine

WORKDIR /app

COPY ./frontend/build /usr/share/nginx/html/
# RUN rm /etc/nginx/conf.d/default.conf

COPY ./frontend/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
