const { checkSchema, validationResult } = require("express-validator");
const postSchemas = require("../schemas/post.schemas");
const postService = require("../services/post.service");
const responses = require("../utils/custom-responses");

module.exports.getAll = (req, res) => {
  postService
    .getAll()
    .then((result) => {
      res.status(200).send(responses.success(result));
    })
    .catch((err) => {
      res.status(400).send(responses.error(err.message));
    });
};

module.exports.add = async (req, res) => {
  await checkSchema(postSchemas.createPost).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(responses.error(errors.array()[0].msg));
  }

  const post = {
    text: req.body.text,
    uid: req.body.uid,
  };

  postService
    .add(post)
    .then((result) => {
      res.status(201).send(responses.success(result, 201));
    })
    .catch((err) => {
      res.status(400).send(responses.error(err.message));
    });
};

module.exports.delete = async (req, res) => {
  await checkSchema(postSchemas.deletePost).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(responses.error(errors.array()[0].msg));
  }

  postService
    .delete(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(400).send(responses.error(err.message));
    });
};
