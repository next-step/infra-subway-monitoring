package nextstep.subway.logging;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ElapseTimeAspect {

	private static final Logger log = LoggerFactory.getLogger(LoggerConstants.FILE_LOGGER);

	@Around("@annotation(org.springframework.stereotype.Service)")
	public Object measureExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
		long startTime = System.nanoTime();
		Object proceedResult = joinPoint.proceed();
		log.trace("Elapsed(ms)='{}' at '{}'", getElapsedTimeInMillis(startTime), joinPoint.getTarget());
		return proceedResult;
	}

	private long getElapsedTimeInMillis(long startTime) {
		return (System.nanoTime() - startTime) / 1_000_000;
	}
}
