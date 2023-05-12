# STAGE 1: build environment
FROM node:16-alpine as build

# ARG APP_ENV

RUN mkdir /opt/app
RUN mkdir /opt/app/container/
WORKDIR /opt/app/container

# install and cache app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm i

COPY . /opt/app/container

# RUN npm run build:${APP_ENV}
RUN npm run build

# STAGE 2: production environment
 
FROM nginx:1.13.12-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /opt/app/container/dist /usr/share/nginx/html
EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]