module.exports.createUser = {
  username: {
    notEmpty: {},
  },
  firstname: {
    notEmpty: {},
  },
  lastname: {
    notEmpty: {},
  },
};

module.exports.deleteUser = {
  id: {
    in: ["params"],
  },
};
