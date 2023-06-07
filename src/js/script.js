'use strict';
{
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
         event.preventDefault()
        const bookId = event.target.closest('a').getAttribute('data-id');
        if(!favoriteBooks.includes(bookId)){
          favoriteBooks.push(bookId);
          event.target.closest('a').classList.add('favorite');}

        else {
          let index = favoriteBooks.indexOf(bookId)
          favoriteBooks.splice(index, 1);
          event.target.closest('a').classList.remove('favorite');
        }
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

