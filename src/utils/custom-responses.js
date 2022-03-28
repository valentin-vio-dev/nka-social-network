module.exports = {
  success: (data, statusCode = 200) => {
    return {
      status: "success",
      statusCode,
      data,
    };
  },
  error: (message, statusCode = 400) => {
    return {
      status: "error",
      statusCode,
      message,
    };
  },
};
