import { Exception } from '@adonisjs/core/exceptions'

export default class ResourceNotFoundException extends Exception {
  static status = 404
  static code = 'E_RESOURCE_NOT_FOUND'

  constructor(message: string = 'Resource not found') {
    super(message, {
      status: ResourceNotFoundException.status,
      code: ResourceNotFoundException.code,
    })
  }
}
