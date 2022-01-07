export class BaseException extends Error {
  errcode: any
  constructor(message, errcode) {
    super(message)
    this.errcode = errcode
  }

  getErrorCode() {
    return this.errcode
  }
}

export class AuthException extends BaseException {
  code: number
  constructor(message, errcode) {
    super(message, errcode)
    this.code = 401
  }
}

export class UserException extends BaseException {
  code: number
  constructor(message, errcode) {
    super(message, errcode)
    this.code = 400
  }
}

export class PermissionException extends BaseException {
  code: number
  constructor(message, errcode) {
    super(message, errcode)
    this.code = 403
  }
}

export class SystemException extends BaseException {
  code: number
  constructor(message, errcode) {
    super(message, errcode)
    this.code = 500
  }
}
