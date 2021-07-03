package nextstep.subway;

import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.google.common.base.Joiner;

@Component
@Aspect
public class SubwayLogAspect {

	private static final Logger logger = LoggerFactory.getLogger(SubwayLogAspect.class);
	private static final Logger fileLogger = LoggerFactory.getLogger("file");

	@Around("execution(* nextstep.subway..ui.*Controller.*(..))")
	public void controllerLog(ProceedingJoinPoint joinPoint) throws Throwable {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
		String paramString = paramMapToString(request.getParameterMap());
		long start = System.currentTimeMillis();
		Object result = joinPoint.proceed();
		long end = System.currentTimeMillis();
		logger.info("{} {} {} {} {} {} {} {}ms", request.getRemoteHost(), request.getRequestURI(), request.getMethod(),
			joinPoint.getSignature().getDeclaringTypeName(), joinPoint.getSignature().getName(), paramString,
			end - start);
		fileLogger.info("{} {} {} {} {} {} {} {}ms", request.getRemoteHost(), request.getRequestURI(),
			request.getMethod(), joinPoint.getSignature().getDeclaringTypeName(), joinPoint.getSignature().getName(),
			paramString, end - start);
	}

	private String paramMapToString(Map<String, String[]> paramMap) {
		return paramMap.entrySet().stream()
			.map(entry -> String.format("%s -> (%s)",
				entry.getKey(), Joiner.on(",").join(entry.getValue())))
			.collect(Collectors.joining(", "));
	}

}