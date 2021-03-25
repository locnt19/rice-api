const CONSTANT = {
  ERROR: {
    AUTHOR: {
      NO_AUTHORIZATION: "Authorization is required.",
      INCORRECT_AUTHORIZATION_TYPE: "Incorrect authorization type.",
      TOKEN_EXPIRED: "Token has expired.",
      VERIFICATION_FAILED: "Certificate verification failed.",
      UNAUTHORIZED: "Unauthorized.",
      FORBIDDEN: "You are not allowed to access this route.",
      NO_EXIST_USER: "User does not exist."
    },
    FIELD: {
      FIELD_NOT_FOUND: "{field} not found.",
      FIELD_INVALID: "{field} is not valid.",
      FIELD_REQUIRED: "{field} is required.",
      FIELD_MIN_LENGTH: "The minimum length of {field} is {length}.",
      FIELD_MAX_LENGTH: "The maximum length of {field} is {length}.",
      GENERATE_SALT_FAILED: "Creating salt for password encryption failed.",
      DUPLICATE_EMAIL: "This email already exists.",
      INCORRECT_PASSWORD: "Incorrect password.",
      PASSWORD_ENCRYPTION_FAILED: "Password encryption failed.",
      PASSWORD_THE_SAME: "The old password and the new password are the same.",
      FIELD_REQUIRED_NUMBER: "{field} is require a number.",
      NO_FILE_SELECTED: "No files have been selected."
    },
    SOMETHING: "Something went wrong.",
    ERROR_001: "ERROR_001" // Token has expired
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
    MESSAGE_NOT_FOUND: "{document} not found.",
    CREATE_FAILED:
      "Creating a new {document} was unsuccessful. Please try again later.",
    UPDATE_FAILED: "Updated {document} unsuccessful. Please try again later.",
    DELETE_FAILED: "Deleted {document} unsuccessful. Please try again later."
  }
};

module.exports = CONSTANT;
