const errorHandler = (error, request, response, next) => {
  console.error(error);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }
  if (error.name === "SequelizeValidationError") {
    return response.status(400).send({ error: error.message });
  }
  if (error.name === "TypeError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

module.exports = { errorHandler };
