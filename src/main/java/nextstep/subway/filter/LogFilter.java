package nextstep.subway.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.util.ContentCachingResponseWrapper;

@WebFilter(urlPatterns = {"/stations", "/paths"})
public class LogFilter implements Filter {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws
		IOException,
		ServletException {
		// json 로깅 대상 요청은 filter에서 reponse를 ContentCachingResponseWrapper 객체로 래핑
		ContentCachingResponseWrapper httpServletResponse = new ContentCachingResponseWrapper(
			(HttpServletResponse)response);

		chain.doFilter(request, httpServletResponse);
		/* ContentCachingResponseWrapper는 한번만 출력가능한 response의 outputStream을 직접 사용하지 않고 ContentCachingResponseWrapper에 캐싱해둠
		 * 클라이언트로 전달 전 실제 response 객체에 copy */
		httpServletResponse.copyBodyToResponse();

	}
}
