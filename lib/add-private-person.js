'use strict'

var miss = require('mississippi')
var getMetadata = require('tfk-arkiv-metadatagenerator')
var p360 = require('p360')
var config = require('../config')

var addContact = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  console.log(item._id + ': add-private-person')

  var i = 0
  item.contacts.forEach(function (contact) {
    console.log(item._id + ': add-private-person: ' + contact.fullName)

    // If contact exist skip step
    // if (contact.exists === true) {
    //  console.log(item._id + ': add-private-person: ' + contact.fullName + ': Did not update private person')
    //  i++
    //  if (item.contacts.length === i) {
    //    return callback(null, JSON.stringify(item))
    //  }
    //  return
    // }

    var addPrivatePerson = {
      generator: 'add-private-person',
      firstName: contact.firstName,
      middleName: contact.middleName,
      lastName: contact.lastName,
      personalIdNumber: contact.personalIdNumber,
      email: contact.email,
      phone: contact.phone,
      streetAddress: contact.address,
      zipCode: contact.zip,
      zipPlace: contact.city,
      area: 'Telemark'
    }

    var options = getMetadata(addPrivatePerson)
    options.p360 = config.p360

    p360(options, function (err, data) {
      if (err) {
        console.error(JSON.stringify(err))
        return callback(err)
      } else {
        i++
        console.log(item._id + ': add-private-person: ' + contact.fullName + ': Updated or created private person')
        if (item.contacts.length === i) {
          return callback(null, JSON.stringify(item))
        }
      }
    })
  })
})

module.exports = addContact
