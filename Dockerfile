###########################################################
#
# Dockerfile for laurentius
#
###########################################################

# Setting the base to nodejs 4.3.1
FROM mhart/alpine-node:16.4.2@sha256:c9014e9e5b33f29d47c867ea548edc0235ba71677f40456409a44c278d8a8e01

# Maintainer
MAINTAINER Jonas Enge

#### Begin setup ####

# Installs git
RUN apk add --update git && rm -rf /var/cache/apk/*

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Env variables
ENV TFK_LAURENTIUS_JWT_KEY NeverShareYourSecret
ENV TFK_LAURENTIUS_CALLBACK_STATUS_MESSAGE Varselbrev arkivert
ENV TFK_LAURENTIUS_ARCHIVE_JOB_DIRECTORY_PATH test/data/archive/jobs
ENV TFK_LAURENTIUS_ARCHIVE_DONE_DIRECTORY_PATH test/data/archive/done
ENV TFK_LAURENTIUS_ARCHIVE_ERROR_DIRECTORY_PATH test/data/archive/errors
ENV TFK_LAURENTIUS_P360WS_USER domain/username
ENV TFK_LAURENTIUS_P360WS_PASSWORD password
ENV TFK_LAURENTIUS_P360WS_BASEURL http://tfk-fh-siweb01t.login.top.no:8088/SI.WS.Core/SIF/

# Startup
ENTRYPOINT node example.js
