module.exports.createGroup = {
  name: {
    notEmpty: {
      errorMessage: "Name is empty!",
    },
  },
};

module.exports.deleteGroup = {
  id: {
    in: ["params"],
  },
};
