package nextstep.subway.logging;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestService {
    private final Logger log = LoggerFactory.getLogger(TestService.class);
    private final Logger FLOG = LoggerFactory.getLogger("file");
    private final Logger JLOG = LoggerFactory.getLogger("json");
    private final Logger ALOG = LoggerFactory.getLogger("access");

    @GetMapping("/test")
    public String test() {

        log.info("[TEST] - {}", log.getName());

        FLOG.info("file - {}", log.getName());

        return "test";
    }
}
