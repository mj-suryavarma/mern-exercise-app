const CustomApiError = require('./customerror')
const BadRequestError = require('./badrequest')
const UnAuthenticationError = require('./unauthorized')
const NotFoundError = require('./notfound')

module.exports = {
    CustomApiError,
    BadRequestError,
    UnAuthenticationError,
    NotFoundError,
}