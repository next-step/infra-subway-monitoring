package nextstep.subway.common.log;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class MethodInputOutputAspect {

	private static final Logger log = LoggerFactory.getLogger("file");

	@Around("execution(* nextstep.subway..*(..))")
	public Object execute(ProceedingJoinPoint joinPoint) throws Throwable {
		log.info("method = {}, args = {}", joinPoint.getSignature(), joinPoint.getArgs());
		Object object = joinPoint.proceed();
		log.info("return = {}", object);
		return object;
	}

}
