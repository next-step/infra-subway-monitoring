package nextstep.subway.common.log;

import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

	@Around("@annotation(nextstep.subway.common.log.Logging)")
	public Object log(ProceedingJoinPoint pjp) throws Throwable {
		Logger log = getLogger(pjp);
		String description = extractLogDescription(pjp);
		List<Argument> input = extractArguments(pjp);
		log.info("[{}] Input {}", description, input);
		Object output = pjp.proceed();
		log.info("[{}] Output {}", description, output);
		return output;
	}

	private Logger getLogger(ProceedingJoinPoint pjp) {
		Class<?> targetClass = pjp.getTarget().getClass();
		return LoggerFactory.getLogger(targetClass);
	}

	private String extractLogDescription(ProceedingJoinPoint pjp) {
		MethodSignature methodSignature = (MethodSignature) pjp.getSignature();
		Method method = methodSignature.getMethod();
		Logging annotation = method.getAnnotation(Logging.class);
		return annotation.description();
	}

	private List<Argument> extractArguments(ProceedingJoinPoint pjp) {
		Object[] args = pjp.getArgs();
		MethodSignature methodSignature = (MethodSignature) pjp.getSignature();
		Parameter[] parameters = methodSignature.getMethod().getParameters();
		return IntStream.range(0, parameters.length)
			.mapToObj(i -> Argument.of(parameters[i], args[i]))
			.collect(Collectors.toList());
	}

}
