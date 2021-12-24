package nextstep.subway.common.logging;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class LogInterceptor implements HandlerInterceptor {
    private final LoggingService loggingService;

    public LogInterceptor(LoggingService loggingService) {
        this.loggingService = loggingService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        int length = request.getContentLength();
        if (length <= 0) {
            loggingService.logRequest(request, null);
        }

        return true;
    }
}
