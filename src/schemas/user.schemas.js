module.exports.createUser = {
  username: {
    notEmpty: {
      errorMessage: "Username is empty!",
    },
  },
  firstname: {
    notEmpty: {
      errorMessage: "Firstname is empty!",
    },
  },
  lastname: {
    notEmpty: {
      errorMessage: "Lastname is empty!",
    },
  },
};

module.exports.deleteUser = {
  id: {
    in: ["params"],
  },
};
