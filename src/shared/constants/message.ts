export const MESSAGE = {
  COMMON: {
    SUCCESS: (text: string) => `${text} successfully`,
    NOT_FOUND: (text: string) => `${text} not found`,
    EXISTS: (text: string) => `${text} already exists`,
    INCORRECT: (text: string) => `${text} is incorrect`,
    ACCESS_DENIED: 'access denied'
  },

  USER: {
    SOMETHING: 'SOMETHING'
  },

  AUTH: {
    WRONG_PASSWORD: 'password is incorrect',
    WRONG_OTP: 'otp is incorrect',
    WRONG_TOKEN: 'token is incorrect',
    NOT_LOGIN: 'you are not logged in',
    PLEASE_CHECK_EMAIL: 'please check your email to get otp code',
    PASSWORD_NOT_MATCH: 'password not match'
  }
}

export const MESSAGE_NAME = {
  USER: 'User',
  POST: 'Posts'
}
