package nextstep.subway.common;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@WebFilter(urlPatterns = "/*")
public class ReadableRequestWrapperFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        ReadableRequestWrapper wrapper = new ReadableRequestWrapper((HttpServletRequest) request);
        chain.doFilter(wrapper, response);
    }

    @Override
    public void destroy() {
    }
}
