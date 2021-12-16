package nextstep.subway.common;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;

@WebFilter("/images/*")
public class ImageResponseHeaderFilter implements Filter {
    @Override
    public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain) throws
        IOException, ServletException {
        final HttpServletResponse httpServletResponse = (HttpServletResponse)response;
        httpServletResponse.setHeader("Cache-Control", "max-age=864000");

        chain.doFilter(request, response);
    }
}
