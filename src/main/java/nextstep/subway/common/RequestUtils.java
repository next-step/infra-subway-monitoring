package nextstep.subway.common;

import static java.lang.String.format;
import static java.util.stream.Collectors.joining;

import com.google.common.base.Joiner;
import javax.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class RequestUtils {
    public static HttpServletRequest request() {
        return ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    }

    public static String toParam(HttpServletRequest request) {
        return request.getParameterMap().entrySet().stream()
            .map(
                entry -> format("[%8s] => [%5s]", entry.getKey(), Joiner.on(",").join(entry.getValue()))
            )
            .collect(joining("\n"));
    }
}
