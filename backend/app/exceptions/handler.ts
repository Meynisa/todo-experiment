/**
 * HttpExceptionHandler - Global Exception Handler for the API
 *
 * This handler intercepts all unhandled exceptions and formats them into
 * consistent JSON error responses. It's registered globally in the AdonisJS app.
 *
 * Error handling strategy:
 * - Validation errors (E_VALIDATION_ERROR) -> 422 status with first error message
 * - Known HTTP errors (with status code)   -> Returns the error's status and message
 * - Unknown/server errors                  -> 500 Internal Server Error
 *
 * The debug mode is automatically enabled in non-production environments
 * to show verbose error details during development.
 */
import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    if (error.code === 'E_VALIDATION_ERROR' && error.messages.length > 0) {
      return ctx.response.status(422).send({
        message: error.messages[0].message,
        data: [],
      })
    }

    if (error.status) {
      return ctx.response.status(error.status).send({
        message: error.message,
        data: [],
      })
    }

    return ctx.response.status(500).send({
      message: 'Internal server error',
      code: error.status,
      errors: [],
    })
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
