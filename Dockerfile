# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM 014092770818.dkr.ecr.us-east-1.amazonaws.com/node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Update package repositories to use Debian archive
RUN sed -i 's/deb.debian.org/archive.debian.org/g' /etc/apt/sources.list && \
    sed -i 's/security.debian.org/security-archive.debian.org/g' /etc/apt/sources.list && \
    sed -i '/stretch-updates/s/^/#/' /etc/apt/sources.list

#
RUN apt-get update && apt-get install -y awscli 

COPY ./ /usr/local/app/

RUN npm install && npm run build


# Stage 2: Serve app with nginx server

FROM 014092770818.dkr.ecr.us-east-1.amazonaws.com/nginx:latest

COPY --from=build /usr/local/app/dist/Frontend /usr/share/nginx/html

COPY ./default.conf /etc/nginx/conf.d/

EXPOSE 80
