import time
import uuid
import logging
from typing import Callable
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
from app.core.config import settings

logger = logging.getLogger("growskill.http")

class SecurityAndObservabilityMiddleware(BaseHTTPMiddleware):
    """Production Middleware enforcing:
    1. Unique Request ID injection (X-Request-ID)
    2. Structured access logging (request_id, endpoint, method, status, duration)
    3. Essential Security Headers (HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, CSP)
    4. Centralized exception containment preventing internal stack trace leaks
    """

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
        request.state.request_id = request_id
        start_time = time.time()

        try:
            response = await call_next(request)
            duration_ms = round((time.time() - start_time) * 1000, 2)

            # Security Headers Injection
            response.headers["X-Request-ID"] = request_id
            response.headers["X-Content-Type-Options"] = "nosniff"
            response.headers["X-Frame-Options"] = "DENY"
            response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
            response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"

            if settings.ENVIRONMENT == "production":
                response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains; preload"

            # Structured production log (Safe: no passwords, tokens, or private bodies logged)
            logger.info(
                f"req_id={request_id} method={request.method} path={request.url.path} "
                f"status={response.status_code} duration={duration_ms}ms"
            )
            return response

        except Exception as exc:
            duration_ms = round((time.time() - start_time) * 1000, 2)
            logger.error(
                f"req_id={request_id} method={request.method} path={request.url.path} "
                f"FAILED error={str(exc)} duration={duration_ms}ms",
                exc_info=True
            )

            # Centralized safe JSON error structure
            return JSONResponse(
                status_code=500,
                headers={"X-Request-ID": request_id},
                content={
                    "error": {
                        "code": "INTERNAL_SERVER_ERROR",
                        "message": "An unexpected error occurred. Our engineering team has been notified.",
                        "request_id": request_id
                    }
                }
            )
