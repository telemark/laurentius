'use strict'

var config = {
  JWT_KEY: process.env.TFK_LAURENTIUS_JWT_KEY || 'Louie Louie, oh no, I got to go. Louie Louie, oh no, I got to go',
  CALLBACK_STATUS_MESSAGE: process.env.TFK_LAURENTIUS_CALLBACK_STATUS_MESSAGE || 'Varselbrev arkivert',
  ARCHIVE_JOB_DIRECTORY_PATH: process.env.TFK_LAURENTIUS_ARCHIVE_JOB_DIRECTORY_PATH || 'test/data/archive/jobs',
  ARCHIVE_DONE_DIRECTORY_PATH: process.env.TFK_LAURENTIUS_ARCHIVE_DONE_DIRECTORY_PATH || 'test/data/archive/done',
  ARCHIVE_ERROR_DIRECTORY_PATH: process.env.TFK_LAURENTIUS_ARCHIVE_ERROR_DIRECTORY_PATH || 'test/data/archive/errors',
  p360: {
    user: process.env.TFK_LAURENTIUS_P360WS_USER || 'domain/username', // username
    password: process.env.TFK_LAURENTIUS_P360WS_PASSWORD || 'password', // passord
    baseUrl: process.env.TFK_LAURENTIUS_P360WS_BASEURL || 'http://tfk-fh-siweb01t.login.top.no:8088/SI.WS.Core/SIF/',
    options: {
      ignoredNamespaces: true
    }
  }
}

module.exports = config
