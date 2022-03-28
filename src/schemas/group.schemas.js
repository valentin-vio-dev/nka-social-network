module.exports.createGroup = {
  name: {
    notEmpty: {},
  },
};

module.exports.deleteGroup = {
  id: {
    in: ["params"],
  },
};
