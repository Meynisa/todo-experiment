/**
 * ForceJsonResponseMiddleware - Ensures JSON Response Format
 *
 * This middleware modifies the incoming request's Accept header to always
 * request JSON responses. This ensures consistent API behavior regardless
 * of what Accept header the client sends.
 *
 * Benefits:
 * - Validation errors return as JSON instead of HTML
 * - Auth errors return as JSON instead of redirects
 * - Consistent response format for API consumers
 *
 * Registered in: start/kernel.ts as a global middleware
 */
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Updating the "Accept" header to always accept "application/json" response
 * from the server. This will force the internals of the framework like
 * validator errors or auth errors to return a JSON response.
 */
export default class ForceJsonResponseMiddleware {
  async handle({ request }: HttpContext, next: NextFn) {
    const headers = request.headers()
    headers.accept = 'application/json'

    return next()
  }
}
