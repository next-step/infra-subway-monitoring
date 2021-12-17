package nextstep.subway.interceptor;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class LoggingInterceptor implements HandlerInterceptor {

	private static final Logger fileLogger = LoggerFactory.getLogger("file");

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
		String requestURI = request.getRequestURI();
		if (requestURI.startsWith("/error")) {
			return true;
		}
		String traceId = UUID.randomUUID().toString();
		MDC.put("traceId",traceId);
		fileLogger.info("==========Request URI = {}", requestURI);
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
		ModelAndView modelAndView) throws Exception {
		fileLogger.info("==========Response Status Code = {}", response.getStatus());
		MDC.clear();
	}
}
