const { checkSchema, validationResult } = require("express-validator");
const friendshipService = require("../services/friendship.service");
const responses = require("../utils/custom-responses");
const friendshipSchemas = require("../schemas/friendship.schemas");

module.exports.add = async (req, res) => {
  await checkSchema(friendshipSchemas.createFriendship).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(responses.error(errors.array()[0].msg));
  }

  const friendship = {
    id: req.body.id,
    other: req.body.other,
  };

  friendshipService
    .add(friendship)
    .then((result) => {
      res.status(201).send(responses.success(result, 201));
    })
    .catch((err) => {
      res.status(400).send(responses.error(err.message));
    });
};

module.exports.delete = async (req, res) => {
  /*/await checkSchema(groupSchemas.deleteGroup).run(req);
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
    });*/
};
