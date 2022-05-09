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

/*module.exports.add = async (req, res) => {
  await checkSchema(userSchemas.createUser).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(responses.error(errors.array()[0].msg));
  }

  const user = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthDate: req.body.birthDate,
  };

  userService
    .add(user)
    .then((result) => {
      res.status(201).send(responses.success(result, 201));
    })
    .catch((err) => {
      res.status(400).send(responses.error(err.message));
    });
};*/

module.exports.delete = async (req, res) => {
  await checkSchema(userSchemas.deleteUser).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(responses.error(errors.array()[0].msg));
  }

  userService
    .delete(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(400).send(responses.error(err.message));
    });
};

module.exports.registrate = async (req, res) => {
  await checkSchema(userSchemas.registrate).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(responses.error(errors.array()[0].msg));
  }

  if (req.body.password !== req.body.passwordAgain) {
    return res.status(400).send(responses.error("Passwords do not match!"));
  }

  const user = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthDate: req.body.birthDate,
    password: req.body.password,
  };

  userService
    .registrate(user)
    .then((result) => {
      res.status(201).send(responses.success(result, 201));
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(responses.error(err.message));
    });
};

module.exports.login = async (req, res) => {
  await checkSchema(userSchemas.login).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(responses.error(errors.array()[0].msg));
  }

  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  userService
    .login(user.username, user.password)
    .then((result) => {
      res.status(201).send(responses.success(result, 201));
    })
    .catch((err) => {
      res.status(400).send(responses.error(err.message));
    });
};
