package nextstep.subway.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@WebFilter(filterName = "loggingFilter", urlPatterns = {"/createMembers", "/login/token", "/paths"})
public class LoggingFilter implements Filter {
    private static final Logger fileLogger = LoggerFactory.getLogger(LoggingFilter.class);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        fileLogger.info("{} start", req.getRequestURI());
        chain.doFilter(request, response);
        fileLogger.info("{} end", req.getRequestURI());
    }
}
