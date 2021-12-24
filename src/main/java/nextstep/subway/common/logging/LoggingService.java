package nextstep.subway.common.logging;

import java.util.Collection;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class LoggingService {
    private static final Logger log = LoggerFactory.getLogger("json");

    public void logRequest(HttpServletRequest httpServletRequest, Object body) {
        LogInfo logInfo = LogInfo.builder()
            .type(ServletType.REQUEST)
            .method(httpServletRequest.getMethod())
            .path(httpServletRequest.getRequestURI())
            .headers(buildHeadersMap(httpServletRequest))
            .parameters(buildParametersMap(httpServletRequest))
            .body(body)
            .build();

        log.debug(logInfo.toString());
    }

    public void logResponse(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
        Object body) {
        LogInfo logInfo = LogInfo.builder()
            .type(ServletType.RESPONSE)
            .method(httpServletRequest.getMethod())
            .path(httpServletRequest.getRequestURI())
            .headers(buildHeadersMap(httpServletResponse))
            .body(body)
            .build();

        log.debug(logInfo.toString());
    }

    private Map<String, String> buildParametersMap(HttpServletRequest httpServletRequest) {
        Map<String, String> resultMap = new HashMap<>();
        Enumeration<String> parameterNames = httpServletRequest.getParameterNames();

        while (parameterNames.hasMoreElements()) {
            String key = parameterNames.nextElement();
            String value = httpServletRequest.getParameter(key);
            resultMap.put(key, value);
        }

        return resultMap;
    }

    private Map<String, String> buildHeadersMap(HttpServletRequest request) {
        Map<String, String> map = new HashMap<>();

        Enumeration<String> headerNames = request.getHeaderNames();

        while (headerNames.hasMoreElements()) {
            String key = headerNames.nextElement();
            String value = request.getHeader(key);
            map.put(key, value);
        }

        return map;
    }

    private Map<String, String> buildHeadersMap(HttpServletResponse response) {
        Map<String, String> map = new HashMap<>();

        Collection<String> headerNames = response.getHeaderNames();
        for (String header : headerNames) {
            map.put(header, response.getHeader(header));
        }

        return map;
    }
}
