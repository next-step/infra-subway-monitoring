package nextstep.subway.filter;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import nextstep.subway.auth.application.AuthService;
import nextstep.subway.auth.infrastructure.AuthorizationExtractor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

@WebFilter(urlPatterns = {"/*"})
public class ApiLogFilter implements Filter {

    private static final Logger logger = LoggerFactory.getLogger(ApiLogFilter.class);
    private final String DEFAULT_STRING = "-";
    private final String CHARACTER_SET = "UTF-8";

    private final AuthService authService;

    public ApiLogFilter(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        logger.info("========= filter instance init ===========");
        Filter.super.init(filterConfig);
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        ContentCachingRequestWrapper requestWrapper = new ContentCachingRequestWrapper(req);
        ContentCachingResponseWrapper responseWrapper = new ContentCachingResponseWrapper(
            (HttpServletResponse) response);

        long start = System.currentTimeMillis();
        chain.doFilter(requestWrapper, responseWrapper);
        long end = System.currentTimeMillis();

        logger.info("\nUSER: {}-{}\n" +
                "REQUEST: {}, {}, {}, {}\n" +
                "HEADERS: {}\n" +
                "REQUEST PARAM: {}\n" +
                "RESPONSE BODY: {}",
            getLoginUser(req), getUserIp(req),
            req.getMethod(), req.getRequestURI(), responseWrapper.getStatus(), (end - start) / 1000,
            getHeaders(req),
            getRequestParam(requestWrapper),
            getResponseBody(responseWrapper));
    }

    @Override
    public void destroy() {
        logger.info("========= filter instance destroy ===========");
        Filter.super.destroy();
    }

    private String getLoginUser(HttpServletRequest request) {
        String credentials = AuthorizationExtractor.extract(request);
        return authService.findMemberIdByToken(credentials).orElse(DEFAULT_STRING);
    }

    private String getUserIp(HttpServletRequest request) {
        String ip;
        ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-RealIP");
        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("REMOTE_ADDR");
        }

        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }

        return ip;
    }

    private Map<String, String> getHeaders(HttpServletRequest request) {
        Map<String, String> header = new HashMap<>();
        Enumeration<String> headerNames = request.getHeaderNames();

        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            header.put(headerName, request.getHeader(headerName));
        }
        return header;
    }

    private String getRequestParam(ContentCachingRequestWrapper request) {
        if (request == null) {
            return DEFAULT_STRING;
        }

        byte[] bytes = request.getContentAsByteArray();
        return byteToString(bytes);
    }

    private String getResponseBody(ContentCachingResponseWrapper response) {

        if (response == null) {
            return DEFAULT_STRING;
        }

        byte[] bytes = response.getContentAsByteArray();
        String body = byteToString(bytes);
        try {
            response.copyBodyToResponse();
        } catch (IOException e) {
            logger.error(e.getMessage());
        }

        return body;
    }


    private String byteToString(byte[] bytes) {
        if (bytes.length <= 0) {
            return DEFAULT_STRING;
        }

        try {
            return new String(bytes, 0, bytes.length, CHARACTER_SET);
        } catch (UnsupportedEncodingException e) {
            return DEFAULT_STRING;
        }
    }

}
