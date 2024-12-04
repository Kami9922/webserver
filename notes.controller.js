const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

const getNotes = async () => {
	const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

const addNote = async (title) => {
	const notes = await getNotes()
	const note = {
		title,
		id: Date.now().toString(),
	}

	notes.push(note)

	await fs.writeFile(notesPath, JSON.stringify(notes))
	console.log(chalk.bgGreen('Note was added!'))
}

const printNotes = async () => {
	const notes = await getNotes()
	console.log(chalk.bgBlue('Here is the list of notes:'))
	notes.forEach((note) => console.log(chalk.blue(note.id, note.title)))
}

const removeNote = async (id) => {
	const notes = await getNotes()
	const noteToRemove = notes.findIndex((note) => note.id === id)
	notes.splice(noteToRemove, 1)

	await fs.writeFile(notesPath, JSON.stringify(notes))
	console.log(chalk.bgGreen('Note was removed!'))
}

module.exports = {
	addNote,
	printNotes,
	removeNote,
}
