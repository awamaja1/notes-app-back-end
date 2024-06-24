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

const deleteNoteHandler = (request, h) => {
  const { id } = request.params
  const note = notes.find(item => item.id === id)
  if (note) {
    notes.splice(notes.indexOf(note), 1)
    return h.response({
      status: 'success',
      message: 'Note deleted'
    }).code(200)
  }
  return h.response({
    status: 'fail',
    message: 'Note not found'
  }).code(404)
}

const editNoteHandler = (request, h) => {
  const { id } = request.params
  const { title, tags, body } = request.payload
  const updatedAt = new Date().toISOString()
  const noteIndex = notes.findIndex(note => note.id === id)
  if (!(noteIndex === -1)) {
    notes[noteIndex] = {
      ...notes[noteIndex],
      title,
      tags,
      body,
      updatedAt
    }
    return h.response({
      status: 'success',
      message: 'Note updated',
      data: {
        ...notes[noteIndex]
      }
    }).code(200)
  }
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
