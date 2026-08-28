import time
import logging
from typing import Dict, Tuple, List
from fastapi import HTTPException, status, Request
from app.core.config import settings

logger = logging.getLogger("growskill.rate_limit")

class SlidingWindowRateLimiter:
    """In-memory sliding window rate limiter tracking request timestamps per (client_id, endpoint_category)."""

    def __init__(self):
        # Maps (identifier, endpoint_category) -> list of timestamp floats
        self._history: Dict[Tuple[str, str], List[float]] = {}

    def check_rate_limit(self, identifier: str, endpoint_category: str, max_requests: int, window_seconds: int = 3600):
        if not settings.RATE_LIMIT_ENABLED:
            return

        now = time.time()
        key = (str(identifier), endpoint_category)
        timestamps = self._history.get(key, [])

        # Filter out timestamps outside the sliding window
        valid_timestamps = [t for t in timestamps if now - t < window_seconds]

        if len(valid_timestamps) >= max_requests:
            oldest = valid_timestamps[0]
            retry_after = int(window_seconds - (now - oldest)) + 1
            logger.warning(f"Rate limit exceeded for identifier={identifier}, category={endpoint_category}. Limit={max_requests}/hr.")
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Rate limit exceeded for {endpoint_category}. Maximum {max_requests} requests per hour allowed. Try again in {retry_after} seconds.",
                headers={"Retry-After": str(retry_after)}
            )

        valid_timestamps.append(now)
        self._history[key] = valid_timestamps

rate_limiter = SlidingWindowRateLimiter()

def limit_mentor_requests(user_id: int):
    rate_limiter.check_rate_limit(
        identifier=str(user_id),
        endpoint_category="mentor_chat",
        max_requests=settings.RATE_LIMIT_MENTOR_PER_HOUR,
        window_seconds=3600
    )

def limit_project_requests(user_id: int):
    rate_limiter.check_rate_limit(
        identifier=str(user_id),
        endpoint_category="project_generation",
        max_requests=settings.RATE_LIMIT_PROJECTS_PER_HOUR,
        window_seconds=3600
    )

def limit_interview_requests(user_id: int):
    rate_limiter.check_rate_limit(
        identifier=str(user_id),
        endpoint_category="interview_evaluation",
        max_requests=settings.RATE_LIMIT_INTERVIEW_PER_HOUR,
        window_seconds=3600
    )
