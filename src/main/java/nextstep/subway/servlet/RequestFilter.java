package nextstep.subway.servlet;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

public class RequestFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
        throws IOException, ServletException {
        ReadableRequestWrapper readableRequestWrapper = new ReadableRequestWrapper(
            (HttpServletRequest) request);
        chain.doFilter(readableRequestWrapper, response);
    }
}
