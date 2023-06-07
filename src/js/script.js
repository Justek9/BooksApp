'use strict'
{
	// Twoim zadaniem jest utworzenie i wywołanie funkcji, która przejdzie po wszystkich książkach z dataSource.books i wyrenderuje dla nich reprezentacje HTML w liście .books-list. Oczywiście musisz wykorzystać w tym celu dostarczony już szablon (#template-book).

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
		}

		renderOnPage() {
			const generatedHTML = templates.templateBooks(this.data)
			this.element = utils.createDOMFromHTML(generatedHTML)
			// console.log(this.element)
			const booksContainer = document.querySelector('.books-list')
            // console.log(booksContainer);
			booksContainer.appendChild(this.element)
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

	const books = new ListOfBooks()
}

