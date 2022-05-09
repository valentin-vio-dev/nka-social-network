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
  birthDate: {
    notEmpty: {
      errorMessage: "Birth date is empty!",
    },
  },
};

module.exports.registrate = {
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
  birthDate: {
    notEmpty: {
      errorMessage: "Birth date is empty!",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password is empty!",
    },
  },
  passwordAgain: {
    notEmpty: {
      errorMessage: "Password again is empty!",
    },
  },
};

module.exports.login = {
  username: {
    notEmpty: {
      errorMessage: "Username is empty!",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password is empty!",
    },
  },
};

module.exports.deleteUser = {
  id: {
    in: ["params"],
  },
};
