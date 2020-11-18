const { borrowingHelper } = require('../helper')

exports.get = (req, res) => {
  if (req.query.populate) {
    if (req.query.populate === 'no') {
      borrowingHelper
        .getAllBorrowingNoPopulate()
        .then(
          borrowings => {
            if (JSON.stringify(borrowings) !== '[]') {
              res.status(200).json(borrowings)
            } else {
              res.status(404).send({
                message: 'No Borrowings found'
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
        message: 'Populate only no'
      })
    }
  } else {
    borrowingHelper
      .getAllBorrowing()
      .then(
        borrowings => {
          if (JSON.stringify(borrowings) !== '[]') {
            res.status(200).json(borrowings)
          } else {
            res.status(404).send({
              message: 'No Borrowings found'
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
}
exports.create = (req, res) => {
  if (req.body.member_id && req.body.book_id) {
    borrowingHelper
      .createBorrowing(req.body.book_id, req.body.member_id)
      .then(
        result => {
          res.status(201).send({
            message:
              'Successfully borrowed for book_id: ' +
              req.body.book_id +
              ' & member_id: ' +
              req.body.member_id
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
exports.return = (req, res) => {
  if (req.body.member_id && req.body.book_id) {
    borrowingHelper
      .returnBorrowing(req.body.book_id, req.body.member_id)
      .then(
        result => {
          res.status(201).send({
            message:
              'Successfully borrowed for book_id: ' +
              req.body.book_id +
              ' & member_id: ' +
              req.body.member_id
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
exports.getCurrent = (req, res) => {
  if (req.query.populate) {
    if (req.query.populate === 'no') {
      borrowingHelper
        .getAllCurrentlyBorrowingNoPopulate()
        .then(
          borrowings => {
            if (JSON.stringify(borrowings) !== '[]') {
              res.status(200).json(borrowings)
            } else {
              res.status(404).send({
                message: 'No Borrowings found'
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
        message: 'Populate only no'
      })
    }
  } else {
    borrowingHelper
      .getAllCurrentlyBorrowing()
      .then(
        borrowings => {
          if (JSON.stringify(borrowings) !== '[]') {
            res.status(200).json(borrowings)
          } else {
            res.status(404).send({
              message: 'No Borrowings found'
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
}
exports.getReturned = (req, res) => {
  if (req.query.populate) {
    if (req.query.populate === 'no') {
      borrowingHelper
        .getAllReturnedBorrowingNoPopulate()
        .then(
          borrowings => {
            if (JSON.stringify(borrowings) !== '[]') {
              res.status(200).json(borrowings)
            } else {
              res.status(404).send({
                message: 'No Borrowings found'
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
        message: 'Populate only no'
      })
    }
  } else {
    borrowingHelper
      .getAllReturnedBorrowing()
      .then(
        borrowings => {
          if (JSON.stringify(borrowings) !== '[]') {
            res.status(200).json(borrowings)
          } else {
            res.status(404).send({
              message: 'No Borrowings found'
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
}
