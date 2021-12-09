package nextstep.subway.common;

import org.aspectj.lang.JoinPoint;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collection;
import java.util.Enumeration;


public class ControllerLogger {
    private static Logger log;
    public static void requestLog(HttpServletRequest request, JoinPoint joinPoint) {
        log = LoggerFactory.getLogger(joinPoint.getSignature().getDeclaringType());

        StringBuilder logContents =
                new StringBuilder("[controller-in] " +
                        joinPoint.getSignature().getName() + "\n" +
                        "[http-request-start-line] " +
                        request.getMethod() + " " +
                        request.getRequestURI() + " " +
                        request.getProtocol() + "\n");

        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String header = headerNames.nextElement();
            logContents
                    .append("[http-request-header] ")
                    .append(header)
                    .append(": ")
                    .append(request.getHeader(header))
                    .append("\n");
        }

        logContents
                .append("\n")
                .append("[http-request-body-start]\n")
                .append(getParams(request))
                .append("\n")
                .append("[http-request-body-end]\n")
                .append("\n");

        log.info(logContents.toString());
    }

    public static void responseLog(HttpServletResponse response, JoinPoint joinPoint) {
        log = LoggerFactory.getLogger(joinPoint.getSignature().getDeclaringType());

        StringBuilder logContents =
                new StringBuilder("[controller-out] " +
                        joinPoint.getSignature().getName() + "\n" +
                        "[http-response-status-line] " +
                        HttpStatus.valueOf(response.getStatus()) + "\n");

         Collection<String> headerNames = response.getHeaderNames();
        for (String header : headerNames) {
            logContents
                    .append("[http-response-header] ")
                    .append(header)
                    .append(": ")
                    .append(response.getHeader(header))
                    .append("\n");
        }

        log.info(logContents.toString());
    }

    public static void responseErrorLog(HttpServletResponse response, JoinPoint joinPoint, Throwable throwable) {
        log = LoggerFactory.getLogger(joinPoint.getSignature().getDeclaringType());

        StringBuilder logContents =
                new StringBuilder("[controller-error] " +
                        joinPoint.getSignature().getName() + "\n" +
                        "[http-response-status-line] " +
                        HttpStatus.valueOf(response.getStatus()) + "\n");

        Collection<String> headerNames = response.getHeaderNames();
        for (String header : headerNames) {
            logContents
                    .append("[http-response-header] ")
                    .append(header)
                    .append(": ")
                    .append(response.getHeader(header))
                    .append("\n");
        }

        logContents
                .append("[http-response-error-message] ")
                .append(throwable.getMessage())
                .append("\n");

        log.error(logContents.toString());
    }

    private static JSONObject getParams(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        Enumeration<String> params = request.getParameterNames();
        while (params.hasMoreElements()) {
            String param = params.nextElement();
            String replaceParam = param.replaceAll("\\.", "-");
            jsonObject.put(replaceParam, request.getParameter(param));
        }
        return jsonObject;
    }
}
