async function remove(id) {
	await fetch(`/${id}`, {
		method: 'DELETE',
	})
}

async function edit(id, newTitle) {
	if (newTitle) {
		await fetch(`/${id}`, {
			method: 'PUT',
			body: JSON.stringify({
				id: id,
				title: newTitle,
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
	}
}

document.addEventListener('click', (event) => {
	if (event.target.dataset.type === 'remove') {
		const id = event.target.dataset.id
		remove(id).then(() => {
			event.target.closest('li').remove()
		})
	}
})

document.addEventListener('click', (event) => {
	if (event.target.dataset.type === 'edit') {
		const id = event.target.dataset.id
		const newTitle = prompt('Enter a new title')

		if (newTitle !== null) {
			edit(id, newTitle).then(() => {
				const spanTitles = [...document.querySelectorAll('.title')]

				const spanTitle = spanTitles.find((item) => item.dataset.id === id)

				spanTitle.innerHTML = newTitle
			})
		}
	}
})
