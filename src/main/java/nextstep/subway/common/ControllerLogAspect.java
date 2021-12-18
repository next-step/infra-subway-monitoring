package nextstep.subway.common;

import java.util.UUID;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

@Aspect
@Component
public class ControllerLogAspect {
	private static final Logger logger = LoggerFactory.getLogger(ControllerLogAspect.class);

	@Around("execution(public * nextstep.subway..ui.*Controller.*(..))")
	public Object log(ProceedingJoinPoint joinPoint) throws Throwable {
		MDC.put("traceId", UUID.randomUUID().toString());
		StopWatch stopWatch = new StopWatch();
		Object result;

		logBefore(joinPoint);

		try {
			stopWatch.start();
			result = joinPoint.proceed();
			stopWatch.stop();
			logAfter(result, stopWatch.getTotalTimeMillis());
		} catch (Throwable t) {
			stopWatch.stop();
			logError(t, stopWatch.getTotalTimeMillis());
			throw t;
		}

		MDC.clear();
		return result;
	}

	private void logBefore(JoinPoint joinPoint) {
		logger.info("[start] signature={}", joinPoint.getSignature().toShortString());

		Object[] args = joinPoint.getArgs();
		for (int i = 0; i < args.length; i++) {
			logger.info("[args][{}] {}", i, args[i]);
		}
	}

	private void logAfter(Object result, long elapsedTime) {
		logger.info("[end] elapsedTime={}ms, response={}", elapsedTime, result);
	}

	private void logError(Throwable t, long elapsedTime) {
		logger.error("[error] elapsedTime={}ms, errorMessage={}", elapsedTime, t.getMessage());
	}
}
