'use strict'

var laurentius = require('./index')
var input = {}

laurentius(input, function (error, message) {
  if (error) {
    console.error(error)
  } else {
    console.log(message)
  }
})
