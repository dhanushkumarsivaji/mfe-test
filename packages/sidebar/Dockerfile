# STAGE 1: build environment
FROM node:16-alpine as build

# ARG APP_ENV

RUN mkdir /opt/app
RUN mkdir /opt/app/sidebar/
WORKDIR /opt/app/sidebar

# install and cache app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm i

COPY . /opt/app/sidebar

# RUN npm run build:${APP_ENV}
RUN npm run build

# STAGE 2: production environment
 
FROM nginx:1.13.12-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /opt/app/sidebar/dist /usr/share/nginx/html
EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]