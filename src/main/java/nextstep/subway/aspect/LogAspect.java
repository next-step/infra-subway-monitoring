package nextstep.subway.aspect;

import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
@Aspect
public class LogAspect {
	private static final Logger log = LoggerFactory.getLogger(LogAspect.class);
	private static final Logger fileLogger = LoggerFactory.getLogger("file");
	private static final Logger consoleLogger = LoggerFactory.getLogger("console");
	private static final Logger jsonLogger = LoggerFactory.getLogger("json");

	@Pointcut("within(nextstep.subway..*Controller)")
	public void onRequest() {}

	@Around("onRequest()")
	public Object logTo(ProceedingJoinPoint method) throws Throwable {
		HttpServletRequest request = getRequest();
		Object result = null;
		String parameter = getParameterInformation(request.getParameterMap());

		long startTime = System.currentTimeMillis();

		try {
			result = method.proceed();
		} catch (Exception e) {
			printRequestErrorLog(request, parameter, method, e);
		} finally {
			printRequestLog(request, parameter, startTime, System.currentTimeMillis(), method);
		}

		return result;
	}

	private HttpServletRequest getRequest() {
		return ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
	}

	private String getParameterInformation(Map<String, String[]> parameterMap) {
		String parameter = "";
		if (!parameterMap.isEmpty()) {
			parameter = " [" + parameterMap.entrySet().stream().map(entry -> entry.getKey() + " : " + entry.getValue()).collect(
				Collectors.joining(", "));
		}
		return parameter;
	}

	private void printRequestLog(HttpServletRequest request, String parameter, long startTime, long endTime, ProceedingJoinPoint method) {
		fileLogger.info("Request URI : {} & Request Parameter : {} at {} ({} ms)", request.getRequestURI(), parameter, method.getSignature().getDeclaringTypeName(), endTime - startTime);
		consoleLogger.debug("Request URI : {} & Request Parameter : {} at {} ({} ms)", request.getRequestURI(), parameter, method.getSignature().getDeclaringTypeName(), endTime - startTime);
	}

	private void printRequestErrorLog(HttpServletRequest request, String parameter, ProceedingJoinPoint method, Exception e) {
		fileLogger.error("Request URI : {} & Request Parameter : {} & Error : {} at {}", request.getRequestURI(), parameter, e.getMessage(), method.getSignature().getDeclaringTypeName());
		consoleLogger.debug("Request URI : {} & Request Parameter : {} & Error : {} at {}", request.getRequestURI(), parameter, e.getMessage(), method.getSignature().getDeclaringTypeName());
	}
}
