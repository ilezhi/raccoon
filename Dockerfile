FROM nginx:1.15

COPY dist/ /app
COPY config/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
