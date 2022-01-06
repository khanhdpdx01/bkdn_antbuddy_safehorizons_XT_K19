const CustomApiError = require('./CustomApiError');

class NotFoundError extends CustomApiError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 404;
    }
}

module.exports = NotFoundError;
