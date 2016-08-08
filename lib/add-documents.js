'use strict'

var miss = require('mississippi')
var getMetadata = require('tfk-arkiv-metadatagenerator')
var p360 = require('p360')
var config = require('../config')

var addDocuments = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  console.log(item._id + ': add-documents')

  var areWeDoneYet = () => {
    if (item.documents.length > 0) {
      next()
    } else {
      return callback(null, JSON.stringify(item))
    }
  }

  var next = () => {
    var document = item.documents.pop()
    var addThisDocuments = {
      generator: 'skoleskyss-add-document',
      title: document.title,
      offTitle: document.offTitle,
      personalIdNumber: item.person.id,
      contacts: item.contacts,
      caseNumber: item.caseNumber,
      file: document.data,
      fileTitle: document.title + '.pdf',
      category: document.type,
      role: 'Avsender'
    }

    if (addThisDocuments.category === 'Dokument ut') {
      addThisDocuments.role = 'Mottaker'
    }
    if (addThisDocuments.category === 'Dokument inn' && item.signOff === false) {
      addThisDocuments.responsiblePerson = true
    }

    var options = getMetadata(addThisDocuments)
    options.p360 = config.p360

    p360(options, function (err, data) {
      if (err) {
        console.error(JSON.stringify(err))
        return callback(err)
      } else {
        console.log(item._id + ': add-documents: added document number: ' + data.CreateDocumentResult.DocumentNumber)
        areWeDoneYet()
      }
    })
  }
  if (item.documents) {
    next()
  } else {
    return callback(null, JSON.stringify(item))
  }
})

module.exports = addDocuments
