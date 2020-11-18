const { bookHelper } = require('../helper')

exports.get = (req, res) => {
  bookHelper
    .getAllBooks()
    .then(
      books => {
        if (JSON.stringify(books) !== 'null') {
          res.status(200).json(books)
        } else {
          res.status(404).send({
            message: 'No Books found'
          })
        }
      },
      err => {
        res.status(500).send({
          message: err.message
        })
      }
    )
    .catch(err => {
      res.status(500).send({
        message: err.message
      })
    })
}

exports.create = (req, res) => {
  if (
    req.body.ISBN &&
    req.body.title &&
    req.body.author &&
    req.body.category &&
    req.body.publisher
  ) {
    bookHelper
      .createBook(
        req.body.ISBN,
        req.body.title,
        req.body.author,
        req.body.category,
        req.body.publisher
      )
      .then(
        result => {
          res.status(201).send({
            message: 'Book created!'
          })
        },
        err => {
          res.status(500).send({
            message: err.message
          })
        }
      )
      .catch(err => {
        res.status(500).send({
          message: err.message
        })
      })
  } else {
    res.status(400).send({
      message: 'Required body not found'
    })
  }
}

exports.createBulk = (req, res) => {
  if (
    req.body.ISBN &&
    req.body.title &&
    req.body.author &&
    req.body.category &&
    req.body.publisher &&
    req.body.count
  ) {
    bookHelper
      .createBookBulk(
        req.body.ISBN,
        req.body.title,
        req.body.author,
        req.body.category,
        req.body.publisher,
        req.body.count
      )
      .then(
        result => {
          res.status(201).send({
            message: 'Books created!'
          })
        },
        err => {
          res.status(500).send({
            message: err.message
          })
        }
      )
      .catch(err => {
        res.status(500).send({
          message: err.message
        })
      })
  } else {
    res.status(400).send({
      message: 'Required body not found'
    })
  }
}

exports.getById = (req, res) => {
  var id = req.params.bookId
  bookHelper
    .getBookId(id)
    .then(
      book => {
        if (JSON.stringify(book) !== 'null') {
          res.status(200).json(book)
        } else {
          res.status(404).send({
            message: 'No Book found with id: ' + id
          })
        }
      },
      err => {
        res.status(500).send({
          message: err.message
        })
      }
    )
    .catch(err => {
      res.status(500).send({
        message: err.message
      })
    })
}

// Query: title, ISBN, author
exports.getQuery = (req, res) => {
  if (req.query.title) {
    const title = req.query.title
    bookHelper
      .getALlBookTitle(title)
      .then(
        book => {
          if (JSON.stringify(book) !== '[]') {
            res.status(200).json(book)
          } else {
            res.status(404).send({
              message: 'No Book found with title: ' + title
            })
          }
        },
        err => {
          res.status(500).send({
            message: err.message
          })
        }
      )
      .catch(err => {
        res.status(500).send({
          message: err.message
        })
      })
  } else if (req.query.ISBN) {
    const ISBN = req.query.ISBN
    bookHelper
      .getAllBookISBN(ISBN)
      .then(
        book => {
          if (JSON.stringify(book) !== '[]') {
            res.status(200).json(book)
          } else {
            res.status(404).send({
              message: 'No Book found with ISBN: ' + ISBN
            })
          }
        },
        err => {
          res.status(500).send({
            message: err.message
          })
        }
      )
      .catch(err => {
        res.status(500).send({
          message: err.message
        })
      })
  } else if (req.query.author) {
    const author = req.query.author
    bookHelper
      .getAllBookAuthor(author)
      .then(
        book => {
          if (JSON.stringify(book) !== '[]') {
            res.status(200).json(book)
          } else {
            res.status(404).send({
              message: 'No Book found with Author: ' + author
            })
          }
        },
        err => {
          res.status(500).send({
            message: err.message
          })
        }
      )
      .catch(err => {
        res.status(500).send({
          message: err.message
        })
      })
  } else if (req.query.title && req.query.ISBN) {
    const title = req.query.title
    const ISBN = req.query.ISBN
    bookHelper
      .getALlBookTitleISBN(title, ISBN)
      .then(
        book => {
          if (JSON.stringify(book) !== '[]]') {
            res.status(200).json(book)
          } else {
            res.status(404).send({
              message: 'No Book found with Title: ' + title + ' & ISBN: ' + ISBN
            })
          }
        },
        err => {
          res.status(500).send({
            message: err.message
          })
        }
      )
      .catch(err => {
        res.status(500).send({
          message: err.message
        })
      })
  } else if (req.query.title && req.query.author) {
    const title = req.query.title
    const author = req.query.author
    bookHelper
      .getAllBookTitleAuthor(title, author)
      .then(
        book => {
          if (JSON.stringify(book) !== '[]') {
            res.status(200).json(book)
          } else {
            res.status(404).send({
              message:
                'No Book found with Author: ' + author + ' & Title: ' + title
            })
          }
        },
        err => {
          res.status(500).send({
            message: err.message
          })
        }
      )
      .catch(err => {
        res.status(500).send({
          message: err.message
        })
      })
  } else if (req.query.ISBN && req.query.author) {
    const ISBN = req.query.ISBN
    const author = req.query.author
    bookHelper
      .getAllBookISBNAuthor(ISBN, author)
      .then(
        book => {
          if (JSON.stringify(book) !== '[]') {
            res.status(200).json(book)
          } else {
            res.status(404).send({
              message:
                'No Book found with Author: ' + author + ' & ISBN: ' + ISBN
            })
          }
        },
        err => {
          res.status(500).send({
            message: err.message
          })
        }
      )
      .catch(err => {
        res.status(500).send({
          message: err.message
        })
      })
  } else if (req.query.title && req.query.author && req.query.ISBN) {
    const title = req.query.title
    const author = req.query.author
    const ISBN = req.query.ISBN
    bookHelper.getAllBook3
      .then(
        book => {
          if (JSON.stringify(book) !== '[]') {
            res.status(200).json(book)
          } else {
            res.status(404).send({
              message:
                'No Book found with Author: ' +
                author +
                ' & ISBN: ' +
                ISBN +
                ' & Title: ' +
                title
            })
          }
        },
        err => {
          res.status(500).send({
            message: err.message
          })
        }
      )
      .catch(err => {
        res.status(500).send({
          message: err.message
        })
      })
  } else {
    res.status(400).send({
      message: 'No Query Param Provided'
    })
  }
}
