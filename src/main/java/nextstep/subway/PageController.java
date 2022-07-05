package nextstep.subway;

import net.logstash.logback.argument.StructuredArguments;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    private static final Logger FILE_LOGGER = LoggerFactory.getLogger("file");

    @GetMapping(value = {
            "/",
            "/stations",
            "/lines",
            "/sections",
            "/path",
            "/login",
            "/join",
            "/mypage",
            "/mypage/edit",
            "/favorites"}, produces = MediaType.TEXT_HTML_VALUE)
    public String index() {
        return "index";
    }
}
