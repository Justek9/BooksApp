'use strict'
{
	const select = {
		templateOf: {
			templateBooks: '#template-book',
		},
	}
	const templates = {
		templateBooks: Handlebars.compile(document.querySelector(select.templateOf.templateBooks).innerHTML),
	}

	class Book {
		constructor(data) {
			this.data = data
			this.renderOnPage()
			this.addToFav()
			this.filter()
		}

		renderOnPage() {
			const generatedHTML = templates.templateBooks(this.data)
			this.element = utils.createDOMFromHTML(generatedHTML)
			// console.log(this.element)
			this.booksContainer = document.querySelector('.books-list')
			// console.log(booksContainer);
			this.booksContainer.appendChild(this.element)
		}

		addToFav() {
			let favoriteBooks = []
			this.booksContainer.addEventListener('dblclick', function (event) {
				event.preventDefault()
				const bookId = event.target.closest('a').getAttribute('data-id')
				if (!favoriteBooks.includes(bookId)) {
					favoriteBooks.push(bookId)
					event.target.closest('a').classList.add('favorite')
				} else {
					let index = favoriteBooks.indexOf(bookId)
					favoriteBooks.splice(index, 1)
					event.target.closest('a').classList.remove('favorite')
				}
			})
		}

		filter() {
			let filtersArray = []
			this.filters = document.querySelector('.filters')
			this.filters.addEventListener('change', function (event) {
				event.preventDefault()
				let checkboxValue = event.target.value

				const allBooks = document.querySelectorAll('.book a')
				for (const book of allBooks) {
					book.classList.remove('hidden')
				}

				if (!filtersArray.includes(checkboxValue)) {
					filtersArray.push(checkboxValue)
				} else {
					let index = filtersArray.indexOf(checkboxValue)
					filtersArray.splice(index, 1)
				}
				for (let book of dataSource.books) {
					let details = book.details
					for (let filter of filtersArray) {
						if (
							!(
								(Object.keys(details)[0] === filter && Object.values(details)[0] === true) ||
								(Object.keys(details)[1] === filter && Object.values(details)[1] === true)
							)
						) {
							const theBook = document.querySelector(`.book > a[data-id="${book.id}"]`)
							theBook.classList.add('hidden')
						}
					}
				}
			})
		}
	}

	class ListOfBooks {
		constructor() {
			this.data = dataSource.books
			this.getListofBooks()
		}

		getListofBooks() {
			for (const book of this.data) {
				new Book(book)
			}
		}
	}

	const app = new ListOfBooks()
}
