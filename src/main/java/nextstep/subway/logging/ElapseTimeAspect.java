package nextstep.subway.logging;

import static net.logstash.logback.argument.StructuredArguments.kv;
import static nextstep.subway.logging.LoggerConstants.JSON_LOGGER;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ElapseTimeAspect {

	private static final Logger log = LoggerFactory.getLogger(JSON_LOGGER);

	@Pointcut("within(@org.springframework.stereotype.Service *)")
	public void serviceMethod() {}

	@Around("serviceMethod()")
	public Object measureExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
		long startTime = System.nanoTime();
		Object proceedResult = joinPoint.proceed();
		log.debug("비즈니스 수행 소요시간='{}', '{}'",
				  kv("elapsedMillis", getElapsedTimeInMillis(startTime)),
				  kv("signature", joinPoint.getSignature()));
		return proceedResult;
	}

	private long getElapsedTimeInMillis(long startTime) {
		return (System.nanoTime() - startTime) / 1_000_000;
	}
}
