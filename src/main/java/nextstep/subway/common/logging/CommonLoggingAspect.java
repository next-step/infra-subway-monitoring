package nextstep.subway.common.logging;

import java.util.UUID;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class CommonLoggingAspect {

	private static final Logger FILE_LOGGER = LoggerFactory.getLogger("file");
	private static final Logger JSON_LOGGER = LoggerFactory.getLogger("json");

	@Around("execution(* nextstep.subway..*.*(..)) && @annotation(Logging)")
	public Object logging(ProceedingJoinPoint joinPoint) throws Throwable {
		Logger logger = logger(joinPoint);
		beforeLogging(joinPoint, logger);
		Object result = null;
		try {
			result = joinPoint.proceed();
		} catch (Exception e) {
			errorLogging(joinPoint, e, logger);
		} finally {
			MDC.clear();
		}
		return result;
	}

	private Logger logger(ProceedingJoinPoint joinPoint) {
		Logging.LoggingType type = loggingType(joinPoint);
		return logger(joinPoint, type);
	}

	private Logger logger(ProceedingJoinPoint joinPoint, Logging.LoggingType type) {
		Logger logger;
		if (type.equals(Logging.LoggingType.FILE)) {
			logger = FILE_LOGGER;
		} else if (type.equals(Logging.LoggingType.JSON)) {
			logger = JSON_LOGGER;
		} else {
			logger = LoggerFactory.getLogger(joinPoint.getSignature().getDeclaringTypeName());
		}
		return logger;
	}

	private Logging.LoggingType loggingType(ProceedingJoinPoint joinPoint) {
		MethodSignature signature = (MethodSignature)joinPoint.getSignature();
		return signature.getMethod().getAnnotation(Logging.class).type();
	}

	private void errorLogging(ProceedingJoinPoint joinPoint, Exception e, Logger logger) {
		logger.error("[Requested Id ] {} Error", MDC.get("requestId"));
		logger.error("[Method Name  ] {}::{}",
			joinPoint.getSignature().getDeclaringTypeName(),
			joinPoint.getSignature().getName());
		logger.error("[Error Info   ] {}.{}",
			e.getClass().getName(),
			e.getMessage());
	}

	private void beforeLogging(ProceedingJoinPoint joinPoint, Logger logger) {
		String requestId = requestId();
		String className = joinPoint.getSignature().getDeclaringTypeName();
		String methodName = joinPoint.getSignature().getName();
		logger.info("[Requested ID ] {} ", requestId);
		logger.info("[Method Name  ] {}::{} ", className, methodName);

		Object[] arguments = joinPoint.getArgs();
		for (int i = 0; i < arguments.length; i++) {
			Object argument = arguments[i];
			logArguments(i, argument);
		}
	}

	private void logArguments(int i, Object argument) {
		if (argument != null) {
			FILE_LOGGER.info("[Arguments[{}] ] {}", i, argument);
		}
	}

	private String requestId() {
		return UUID.randomUUID().toString();
	}

}
