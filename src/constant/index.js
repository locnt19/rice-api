const CONSTANT = {
  ERROR: {
    AUTHOR: {
      NO_AUTHORIZATION: "Authorization is required.",
      INVALID_CERTIFICATE: "Certificate is not valid.",
      UNAUTHORIZED: "Unauthorized."
    },
    FIELD: {
      FIELD_NOT_FOUND: "{field} not found.",
      FIELD_INVALID: "{field} is not valid.",
      FIELD_REQUIRED: "{field} is required.",
      DUPLICATE_EMAIL: "This email already exists.",
      INCORRECT_PASSWORD: "Incorrect password."
    },
    SOMETHING: "Something went wrong."
  },
  STATUS: {
    CODE_200: 200, // OK
    CODE_201: 201, // Created
    CODE_400: 400, // Bad Request
    CODE_401: 401, // Unauthorized
    CODE_403: 403, // Forbidden
    CODE_404: 404, // Not Found
    CODE_500: 500, // Internal Server Error
    CODE_502: 502 // Bad Gateway
  },
  RESPONSE: {
    MESSAGE_CREATED: "Create a new {document} successfully.",
    MESSAGE_UPDATED: "Updated {document} successful.",
    MESSAGE_DELETED: "Deleted {document} successful.",
    MESSAGE_NOT_FOUND: "{document} not found."
  }
};

module.exports = CONSTANT;
