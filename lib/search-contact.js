'use strict'

var miss = require('mississippi')
var getMetadata = require('tfk-arkiv-metadatagenerator')
var p360 = require('p360')
var config = require('../config')

var searchContact = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  console.log(item._id + ': search-contact')
  var i = 0

  item.contacts.forEach(function (contact) {
    console.log(item._id + ': search-contact: ' + contact.fullName)

    var getPrivatePerson = {
      generator: 'get-private-persons-id',
      personalIdNumber: contact.personalIdNumber
    }

    var options = getMetadata(getPrivatePerson)
    options.p360 = config.p360

    p360(options, function (err, data) {
      if (err) {
        console.error(JSON.stringify(err))
        return callback(err)
      } else {
        item.contacts[i].exists = false
        var privatePersons = data.GetPrivatePersonsResult.PrivatePersons
        if (Array.isArray(privatePersons.PrivatePersonBase)) {
          item.contacts[i].exists = true
          console.log(item._id + ': search-contact: ' + contact.fullName + ': exists in p360')
          // result = data.GetPrivatePersonsResult.PrivatePersons.PrivatePersonBase[0]
        }
        i++
        if (item.contacts.length === i) {
          return callback(null, JSON.stringify(item))
        }
      }
    })
  })
})

module.exports = searchContact
