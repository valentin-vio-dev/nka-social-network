module.exports.createPost = {
  text: {
    notEmpty: {
      errorMessage: "Text is empty!",
    },
  },
  uid: {
    notEmpty: {
      errorMessage: "User id is required!",
    },
  },
};

module.exports.deletePost = {
  id: {
    in: ["params"],
  },
};
