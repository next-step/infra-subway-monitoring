package nextstep.subway.log;

import java.util.Arrays;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ServiceLogAspect {

	private static final Logger LOGGER = LoggerFactory.getLogger(ServiceLogAspect.class);

	@Before("execution(public * nextstep.subway.*.application..*Service.*(..))")
	public void logBefore(JoinPoint joinPoint){
		LOGGER.info(":::Before::: {}", getInvokeLog(joinPoint));
	}

	@AfterReturning(value = "execution(public * nextstep.subway.*.application..*Service.*(..))", returning = "returnValue")
	public void logAfterReturning(JoinPoint joinPoint, Object returnValue){
		LOGGER.info(":::Returning::: {}", getReturnLog(joinPoint, returnValue));
	}

	private String getInvokeLog(JoinPoint joinPoint){
		return String.format("%s, Args: %s", joinPoint.toString(), Arrays.toString(joinPoint.getArgs()));
	}

	private String getReturnLog(JoinPoint joinPoint, Object returnValue){
		return String.format("%s, Returned: %s, Args: %s", joinPoint.toString(), returnValue, Arrays.toString(joinPoint.getArgs()));
	}


}
