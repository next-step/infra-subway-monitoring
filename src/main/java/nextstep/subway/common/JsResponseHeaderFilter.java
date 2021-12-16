package nextstep.subway.common;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;

@WebFilter("/js/*")
public class JsResponseHeaderFilter implements Filter {
    @Override
    public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain) throws
        IOException, ServletException {
        final HttpServletResponse httpServletResponse = (HttpServletResponse)response;
        httpServletResponse.setHeader("Content-Encoding", "gzip");
        httpServletResponse.setHeader("Cache-Control", "max-age=86400");

        chain.doFilter(request, response);
    }
}
