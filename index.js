const express = require('express')
const chalk = require('chalk')
const path = require('path')
const mongoose = require('mongoose')

const {
	addNote,
	getNotes,
	removeNote,
	editNote,
} = require('./notes.controller')

const port = 3000

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(
	express.urlencoded({
		extended: true,
	})
)

app.get('/', async (req, res) => {
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
		error: false,
	})
})

app.post('/', async (req, res) => {
	try {
		await addNote(req.body.title)
		res.render('index', {
			title: 'Express App',
			notes: await getNotes(),
			created: true,
			error: false,
		})
	} catch (error) {
		console.error('Creation error', error)
		await addNote(req.body.title)
		res.render('index', {
			title: 'Express App',
			created: false,
			error: true,
		})
	}
})

app.put('/:id', async (req, res) => {
	await editNote({ id: req.params.id, title: req.body.title })

	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
		error: false,
	})
})

app.delete('/:id', async (req, res) => {
	await removeNote(req.params)
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false,
		error: false,
	})
})

mongoose
	.connect(
		'mongodb+srv://kami:jvtqhfthjljve111@cluster.coi65.mongodb.net/Test?retryWrites=true&w=majority&appName=Cluster',
		{
			dbName: 'Test',
		}
	)
	.then(() => {
		app.listen(port, () => {
			console.log(chalk.green(`Server has been started on port ${port}...`))
		})
	})
