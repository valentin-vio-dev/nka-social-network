module.exports.createFriendship = {
  id: {
    notEmpty: {
      errorMessage: "Id is empty!",
    },
  },
  otherId: {
    notEmpty: {
      errorMessage: "Other Id is empty!",
    },
  },
};

module.exports.deleteFriendship = {
  id: {
    notEmpty: {
      errorMessage: "Id is empty!",
    },
  },
  otherId: {
    notEmpty: {
      errorMessage: "Other Id is empty!",
    },
  },
};
