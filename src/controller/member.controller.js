const { memberHelper } = require('../helper')

exports.get = (req, res) => {
  memberHelper
    .getAllMembers()
    .then(
      members => {
        if (JSON.stringify(members) !== '[]') {
          res.status(200).json(members)
        } else {
          res.status(404).send({
            message: 'No Members found'
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
  if (req.body.name && req.body.address && req.body.phone) {
    const name = req.body.name
    const address = req.body.address
    const phone = req.body.phone
    memberHelper
      .createMember(name, address, phone)
      .then(
        result => {
          res.status(201).send({
            message: 'Member created'
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
          messge: err.message
        })
      })
  } else {
    res.status(400).send({
      message: 'Required body not found'
    })
  }
}

exports.getById = (req, res) => {
  const id = req.params.memberId
  memberHelper
    .getMemberId(id)
    .then(
      member => {
        if (JSON.stringify(member) !== 'null') {
          res.status(200).json(member)
        } else {
          res.status(404).send({
            message: 'No Member found with id: ' + id
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

exports.getByQuery = (req, res) => {
  if (req.query.name) {
    memberHelper.getMemberName(req.query.name).then(member => {
      if (JSON.stringify(member) !== '[]') {
        res.status(200).json(member)
      } else {
        res.status(404).send({
          message: 'No Member found with name: ' + req.query.name
        })
      }
    })
  } else {
    res.status(400).send({
      message: 'No query param provided'
    })
  }
}
