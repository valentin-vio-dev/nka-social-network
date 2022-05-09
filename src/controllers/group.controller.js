const { checkSchema, validationResult } = require("express-validator");
const groupService = require("../services/group.service");
const responses = require("../utils/custom-responses");
const groupSchemas = require("../schemas/group.schemas");

module.exports.getAll = (req, res) => {
  groupService
    .getAll()
    .then((result) => {
      res.status(200).send(responses.success(result));
    })
    .catch((err) => {
      res.status(400).send(responses.error(err.message));
    });
};

module.exports.add = async (req, res) => {
  await checkSchema(groupSchemas.createGroup).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(responses.error(errors.array()[0].msg));
  }

  const group = {
    name: req.body.name,
    membersCount: 0,
    uid: req.body.uid,
  };

  groupService
    .add(group)
    .then((result) => {
      res.status(201).send(responses.success(result, 201));
    })
    .catch((err) => {
      res.status(400).send(responses.error(err.message));
    });
};

module.exports.delete = async (req, res) => {
  await checkSchema(groupSchemas.deleteGroup).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(responses.error(errors.array()[0].msg));
  }

  groupService
    .delete(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(400).send(responses.error(err.message));
    });
};
