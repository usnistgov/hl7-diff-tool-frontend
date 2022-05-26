
#Stage 1
# Create image based on the official Node 8 image from dockerhub

FROM node:16 as node

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory

WORKDIR /usr/src/app

# Copy dependency definitions

COPY package.json /usr/src/app

# Install dependecies

RUN npm install

# Get all the code needed to run the app

COPY . /usr/src/app

# Run the angular in product
RUN npm run ng build -- --prod --output-path=dist

COPY ./dist /usr/src/app/dist

# Stage 2
# FROM nginx:1.13.12-alpine

#copy dist content to html nginx folder, config nginx to point in index.html
# COPY --from=node /usr/src/app/dist /usr/share/nginx/html

# COPY ./nginx.conf /etc/nginx/conf.d/default.conf



#############
### build ###
#############

# base image
FROM node:12 as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install

# add app
COPY . /app

# generate build
RUN npm run build:$env

############
### prod ###
############

# base image
FROM nginx:1.16.0-alpine

# copy artifact build from the 'build environment'
COPY --from=build /app/dist /usr/share/nginx/html

# expose port 8085
EXPOSE 8085

# run nginx
CMD ["nginx", "-g", "daemon off;"]