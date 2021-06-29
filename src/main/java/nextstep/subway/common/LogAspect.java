package nextstep.subway.common;

import java.text.MessageFormat;
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

import com.google.common.base.Joiner;

@Component
@Aspect
public class LogAspect {
	private static final Logger LOGGER = LoggerFactory.getLogger(LogAspect.class);
	private static final Logger FILE_LOGGER = LoggerFactory.getLogger("file");

	@Pointcut("within(nextstep.subway..ui..*)")
	public void onRequest() {
	}

	@Around("nextstep.subway.common.LogAspect.onRequest()")
	public Object doLogging(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
		HttpServletRequest request = // 5
			((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();

		String params = this.getParams(request);

		long start = System.currentTimeMillis();
		try {
			return proceedingJoinPoint.proceed(proceedingJoinPoint.getArgs()); // 6
		} finally {
			long end = System.currentTimeMillis();
			String format = MessageFormat.format("Request: {0} {1} {2} < {3} ({4}ms)", request.getMethod(),
				request.getRequestURI(),
				params, request.getRemoteHost(), end - start);
			LOGGER.info(format);
			FILE_LOGGER.info(format);
		}
	}

	private String getParams(HttpServletRequest request) {
		Map<String, String[]> paramMap = request.getParameterMap();
		String params = "";
		if (!paramMap.isEmpty()) {
			params = " [" + paramMapToString(paramMap) + "]";
		}
		return params;
	}

	private String paramMapToString(Map<String, String[]> paramMap) {
		return paramMap.entrySet().stream()
			.map(entry -> String.format("%s -> (%s)",
				entry.getKey(), Joiner.on(",").join(entry.getValue())))
			.collect(Collectors.joining(", "));
	}
}
