package nextstep.subway.common;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

	private static final Logger logger = LoggerFactory.getLogger(LoggingAspect.class);
	private static final String LOGGING_CONTROLLER = "execution(public * nextstep.subway..ui.*Controller.*(..))";

	@Before(value = LOGGING_CONTROLLER)
	public void requestLog(JoinPoint joinPoint){
		logger.info("{}, {} => Request: {}",
			joinPoint.getTarget().getClass(),
			joinPoint.getSignature().getName(),
			joinPoint.getArgs());
	}

	@AfterReturning(value =  LOGGING_CONTROLLER, returning = "responseEntity")
	public void responseLog(JoinPoint joinPoint, ResponseEntity<?> responseEntity){
		logger.info("{}.{} => Response [{}]: {} "
			, joinPoint.getTarget().getClass()
			, joinPoint.getSignature().getName()
			, responseEntity.getStatusCodeValue()
			, responseEntity.getBody());
	}

	@AfterThrowing(value = LOGGING_CONTROLLER, throwing = "exception")
	public void exceptionLog(JoinPoint joinPoint, Exception exception){
		logger.error("{}.{} => Exception: {} "
			, joinPoint.getSignature().getName()
			, joinPoint.getArgs()
			, exception.getStackTrace());
	}
}
