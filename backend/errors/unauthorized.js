const CustomApiError = require('./customerror');
const {StatusCodes} = require('http-status-codes')

class UnauthorizedError extends CustomApiError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthorizedError