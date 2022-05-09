module.exports.createGroup = {
  name: {
    notEmpty: {
      errorMessage: "Name is empty!",
    },
  },
  uid: {
    notEmpty: {
      errorMessage: "User id is required!",
    },
  },
};

module.exports.deleteGroup = {
  id: {
    in: ["params"],
  },
};

module.exports.addMember = {
  name: {
    notEmpty: {
      errorMessage: "Name is empty!",
    },
  },
  uid: {
    notEmpty: {
      errorMessage: "User id is required!",
    },
  },
};
