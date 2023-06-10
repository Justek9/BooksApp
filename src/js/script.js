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
    }

    renderOnPage() {
      this.data.ratingBgc = this.determineRatingBgc(this.data.rating);
      this.data.ratingWidth = (this.data.rating / 10) * 100;
      const generatedHTML = templates.templateBooks(this.data);
      this.element = utils.createDOMFromHTML(generatedHTML);
      this.booksContainer = document.querySelector('.books-list');
      this.booksContainer.appendChild(this.element);
    }

    determineRatingBgc(rating) {
      if (rating < 6) {
        this.ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      }
      if (rating > 6 && rating <= 8) {
        this.ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      }
      if (rating > 8 && rating <= 9) {
        this.ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      }
      if (rating > 9) {
        this.ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return this.ratingBgc;
    }
  }

  class ListOfBooks {
    constructor() {
      this.data = dataSource.books;
      this.getListofBooks();
      this.getElements();
      this.addToFav();
      this.filter();
    }

    getListofBooks() {
      for (const book of this.data) {
        new Book(book);
      }
    }

    getElements() {
      this.booksContainer = document.querySelector('.books-list');
    }

    addToFav() {
      let favoriteBooks = [];
      this.booksContainer.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const bookId = event.target.closest('a').getAttribute('data-id');
        if (!favoriteBooks.includes(bookId)) {
          favoriteBooks.push(bookId);
          event.target.closest('a').classList.add('favorite');
        } else {
          let index = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(index, 1);
          event.target.closest('a').classList.remove('favorite');
        }
      });
    }

    filter() {
      let filtersArray = [];
      this.filters = document.querySelector('.filters');
      this.filters.addEventListener('change', function (event) {
        event.preventDefault();
        let checkboxValue = event.target.value;
        const allBooks = document.querySelectorAll('.book a');

        for (const book of allBooks) {
          book.classList.remove('hidden');
        }

        if (!filtersArray.includes(checkboxValue)) {
          filtersArray.push(checkboxValue);
        } else {
          let index = filtersArray.indexOf(checkboxValue);
          filtersArray.splice(index, 1);
        }

        for (let book of dataSource.books) {
          let details = book.details;
          for (let filter of filtersArray) {
            if (
              !(
                (Object.keys(details)[0] === filter && Object.values(details)[0] === true) ||
								(Object.keys(details)[1] === filter && Object.values(details)[1] === true)
              )
            ) {
              const theBook = document.querySelector(`.book > a[data-id="${book.id}"]`);
              theBook.classList.add('hidden');
            }
          }
        }
      });
    }
  }

  new ListOfBooks();
}
