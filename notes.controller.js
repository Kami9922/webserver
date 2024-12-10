const chalk = require('chalk')
const Note = require('./models/note')

const getNotes = async () => {
	const notes = await Note.find()
	return notes
}

const addNote = async (title) => {
	await Note.create({ title })
	console.log(chalk.bgGreen('Note was added!'))
}

const removeNote = async (id) => {
	await Note.deleteOne({ id })
	console.log(chalk.bgGreen('Note was removed!'))
}

const editNote = async (noteData) => {
	await Note.updateOne({ _id: noteData.id }, { title: noteData.title })
	console.log(chalk.bgGreen('Note was edited!'))
}

module.exports = {
	addNote,
	removeNote,
	getNotes,
	editNote,
}
