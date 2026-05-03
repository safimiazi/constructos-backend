import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * AuditInterceptor — logs write operations to console.
 * TODO: Inject AuditLogService and persist to DB when ready.
 */
@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<{
      method: string;
      path: string;
      user?: { id: string; tenantId: string };
    }>();
    const { method, path } = req;

    if (
      !['POST', 'PATCH', 'DELETE'].includes(method) ||
      path.includes('audit-logs')
    ) {
      return next.handle();
    }

    return next.handle().pipe(
      tap({
        next: () => {
          // TODO: persist to audit_logs table
          //   auditService.log({
          //     userId: user?.id,
          //     tenantId: user?.tenantId,
          //     action: `${method} ${path}`,
          //   });
        },
      }),
    );
  }
}
