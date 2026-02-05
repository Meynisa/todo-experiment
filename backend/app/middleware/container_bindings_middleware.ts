/**
 * ContainerBindingsMiddleware - IoC Container Bindings for Request Lifecycle
 *
 * This middleware runs on every HTTP request and binds request-specific instances
 * to the AdonisJS IoC container. This enables dependency injection of HttpContext
 * and Logger throughout the application.
 *
 * Why it's needed:
 * - Allows services/controllers to receive HttpContext via @inject() decorator
 * - Provides access to request-scoped logger instance
 * - Enables clean separation of concerns without passing ctx manually
 *
 * Registered in: start/kernel.ts as a global middleware
 */
import { Logger } from '@adonisjs/core/logger'
import { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * The container bindings middleware binds classes to their request
 * specific value using the container resolver.
 *
 * - We bind "HttpContext" class to the "ctx" object
 * - And bind "Logger" class to the "ctx.logger" object
 */
export default class ContainerBindingsMiddleware {
  handle(ctx: HttpContext, next: NextFn) {
    ctx.containerResolver.bindValue(HttpContext, ctx)
    ctx.containerResolver.bindValue(Logger, ctx.logger)

    return next()
  }
}
