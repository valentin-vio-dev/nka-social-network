const { checkSchema, validationResult } = require("express-validator");
const userSchemas = require("../schemas/user.schemas");
const userService = require("../services/user.service");
const responses = require("../utils/custom-responses");

module.exports.getAll = (req, res) => {
  userService
    .getAll()
    .then((result) => {
      res.status(200).send(responses.success(result));
    })
    .catch((err) => {
      res.status(400).send(responses.error(err.message));
    });
};

module.exports.add = async (req, res) => {
  await checkSchema(userSchemas.createUser).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(responses.error(errors.array()[0].msg));
  }

  const user = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  userService
    .add(user)
    .then((result) => {
      res.status(201).send(responses.success(result, 201));
    })
    .catch((err) => {
      res.status(400).send(responses.error(err.message));
    });
};

module.exports.delete = async (req, res) => {
  await checkSchema(userSchemas.deleteUser).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(responses.error(errors.array()[0].msg));
  }

  userService
    .delete(req.params.id)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(400).send(responses.error(err.message));
    });
};
