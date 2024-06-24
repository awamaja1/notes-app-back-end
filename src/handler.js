const { nanoid } = require('nanoid')
const notes = require('./notes')

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload
  const id = nanoid(16)
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt
  const note = { title, tags, body, id, createdAt, updatedAt }
  notes.push(note)

  const isSuccess = notes.filter(item => item.id === note.id).length > 0

  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'Note added',
      data: {
        id: note.id
      }
    }).code(201)
  }
  return h.response({
    status: 'fail',
    message: 'Note not added'
  }).code(500)
}

const deleteNoteHandler = () => {}

const editNoteHandler = (request, h) => {
  const { id } = request.params
  const { title, tags, body } = request.payload
  notes.forEach(note => {
    if (note.id === id) {
      note.title = title
      note.tags = tags
      note.body = body
      note.updatedAt = new Date().toISOString()
      return h.response({
        status: 'success',
        message: 'Note updated',
        data: {
          note
        }
      }).code(200)
    }
  })
  return h.response({
    status: 'fail',
    message: 'Note not found'
  }).code(404)
}

const getNoteHandler = (request, h) => {
  const { id } = request.params
  const note = notes.find(item => item.id === id)
  if (note) {
    return h.response({
      status: 'success',
      data: {
        note
      }
    })
  }
  return h.response({
    status: 'fail',
    message: 'Note not found'
  }).code(404)
}

const getAllNotesHandler = () => ({ status: 'success', data: { notes } })

module.exports = { addNoteHandler, deleteNoteHandler, getNoteHandler, editNoteHandler, getAllNotesHandler }
