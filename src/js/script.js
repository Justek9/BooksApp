'use strict';
{
  // Twoim zadaniem jest utworzenie i wywołanie funkcji, która przejdzie po wszystkich książkach z dataSource.books i wyrenderuje dla nich reprezentacje HTML w liście .books-list. Oczywiście musisz wykorzystać w tym celu dostarczony już szablon (#template-book).

  const select = {
    templateOf: {
      templateBooks: '#template-book',
    },
  };
  const templates = {
    templateBooks: Handlebars.compile(document.querySelector(select.templateOf.templateBooks).innerHTML),
  };

  class Book {
    constructor(data) {
      this.data = data;
      this.renderOnPage();
      this.addToFav();
    }

    renderOnPage() {
      const generatedHTML = templates.templateBooks(this.data);
      this.element = utils.createDOMFromHTML(generatedHTML);
      // console.log(this.element)
      this.booksContainer = document.querySelector('.books-list');
      // console.log(booksContainer);
      this.booksContainer.appendChild(this.element);
    }

    addToFav(){
      let favoriteBooks = [];
      this.booksContainer.addEventListener('dblclick', function(event){
      // event.preventDefault()
      // console.log(event.target.closest("a"));
        const bookId = event.target.closest('a').getAttribute('data-id');
        favoriteBooks.push(bookId);
        event.target.closest('a').classList.add('favorite');
      // console.log(favoriteBooks);
      });     
    }


  }

  class ListOfBooks {
    constructor() {
      this.data = dataSource.books;
      this.getListofBooks();
    }

    getListofBooks() {
      for (const book of this.data) {
        new Book(book);
      }
    }
  }

  new ListOfBooks();
}

