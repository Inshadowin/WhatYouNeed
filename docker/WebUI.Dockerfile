FROM node:11.15.0 as build-stage

WORKDIR /app
COPY package*.json /app/

RUN npm config set proxy ${http_proxy} && \
    npm config set https-proxy ${https_proxy} && \
    npm install
    
COPY ./ /app/
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.16-alpine
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf