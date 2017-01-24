class NotFoundError extends Error {
  constructor(message) {
    super(message);

    // Useful codes to be used in other contexts
    this.code = 'ENOTFOUND';
    this.httpStatusCode = 404;
  }
}

module.exports = {
  NotFoundError,
};
