package nextstep.subway.common;

import java.util.UUID;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

@Aspect
@Component
public class ControllerLogAspect {
	private static final Logger logger = LoggerFactory.getLogger(ControllerLogAspect.class);

	@Around("@annotation(ControllerLog)")
	public Object log(ProceedingJoinPoint joinPoint) {
		UUID requestId = UUID.randomUUID();
		StopWatch stopWatch = new StopWatch();
		Object result = null;

		logBefore(joinPoint, requestId);

		try {
			stopWatch.start();
			result = joinPoint.proceed();
			stopWatch.stop();
			logAfter(result, requestId, stopWatch.getTotalTimeMillis());
		} catch (Throwable t) {
			stopWatch.stop();
			logError(t, requestId, stopWatch.getTotalTimeMillis());
		}

		return result;
	}

	private void logBefore(JoinPoint joinPoint, UUID requestId) {
		logger.info("[{}][start] signature={}", requestId, joinPoint.getSignature().toShortString());

		Object[] args = joinPoint.getArgs();
		for (int i = 0; i < args.length; i++) {
			logger.info("[{}][args][{}] {}", requestId, i, args[i]);
		}
	}

	private void logAfter(Object result, UUID requestId, long elapsedTime) {
		logger.info("[{}][end] elapsedTime={}ms, response={}", requestId, elapsedTime, result);
	}

	private void logError(Throwable t, UUID requestId, long elapsedTime) {
		logger.error("[{}][error] elapsedTime={}ms, errorMessage={}", requestId, elapsedTime, t.getMessage());
		logger.error(String.format("[%s][stacktrace]", requestId.toString()), t);
	}
}
