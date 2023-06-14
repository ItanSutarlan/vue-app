module.exports = (error, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  if (
    error.message === "AuthenticationError" ||
    error.message === "InvalidTokenError"
  ) {
    statusCode = 401;
    message =
      error.message === "AuthenticationError"
        ? "Invalid email or password"
        : "Invalid token";
  } else if (error.message === "AuthorizationError") {
    statusCode = 403;
    message = "You are not allowed to access this resource";
  } else if (error.message === "NotFoundError") {
    statusCode = 404;
    message = "Id is not found";
  } else if (
    error.name === "TokenExpiredError" ||
    error.name === "JsonWebTokenError"
  ) {
    statusCode = 401;
    message = "Invalid token";
  } else if (error.name === "SequelizeValidationError") {
    statusCode = 400;
    message = error.errors.map((x) => x.message);
  } else if (error.name === "SequelizeUniqueConstraintError") {
    statusCode = 400;
    message = error.errors.map((x) => x.message);
  } else {
    // Internal Server Error
    console.log(error);
  }
  res.status(statusCode).json({
    statusCode,
    message,
  });
};
