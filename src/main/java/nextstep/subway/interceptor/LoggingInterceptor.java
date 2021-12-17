package nextstep.subway.interceptor;

import java.io.IOException;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.ContentCachingResponseWrapper;

public class LoggingInterceptor implements HandlerInterceptor {

	private static final Logger fileLogger = LoggerFactory.getLogger("file");
	private static final Logger jsonLogger = LoggerFactory.getLogger("json");

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws
		IOException {
		String requestURI = request.getRequestURI();
		if (requestURI.startsWith("/error")) {
			return true;
		}

		String traceId = UUID.randomUUID().toString();
		MDC.put("traceId", traceId);
		fileLogger.info("==========Request URI = {}", requestURI);
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
		ModelAndView modelAndView) throws Exception {

		// filter에서 ContentCachingResponseWrapperd으로 래핑된 reponse는 여러번 출력 가능하고 isCommitted()가 true
		if(!response.isCommitted()){
			ContentCachingResponseWrapper responseConent = (ContentCachingResponseWrapper)response;
			String responseBody = new String(responseConent.getContentAsByteArray());
			jsonLogger.info("request: {} {}, bodyContent: {}", request.getMethod(),request.getRequestURI(), responseBody);
		}

		fileLogger.info("==========Response Status Code = {}", response.getStatus());
		MDC.clear();
	}
}
