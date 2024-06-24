const { addNoteHandler, getAllNotesHandler, getNoteHandler, editNoteHandler } = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteHandler
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteHandler
  },
  {
    method: 'GET',
    path: '/{param*}',
    handler: (request, h) => {
      return '404 Page'
    }
  }
]

module.exports = routes
