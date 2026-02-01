import { Exception } from '@adonisjs/core/exceptions'

export default class OperationFailedException extends Exception {
  static status = 500
  static code = 'E_OPERATION_FAILED'

  constructor(message: string = 'Operation failed') {
    super(message, {
      status: OperationFailedException.status,
      code: OperationFailedException.code,
    })
  }
}
