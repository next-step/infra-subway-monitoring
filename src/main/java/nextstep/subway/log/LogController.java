package nextstep.subway.log;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;


@RestController
@RequestMapping("/logs")
public class LogController {

    private static final Logger log = LoggerFactory.getLogger(LogController.class);
    private static final Logger consoleLogger = LoggerFactory.getLogger("console");
    private static final Logger fileLogger = LoggerFactory.getLogger("file");

    @GetMapping("/level")
    public String level() {
        log.trace("A TRACE Message");
        log.debug("A DEBUG Message");
        log.info("An INFO Message : {}", LocalDateTime.now());
        log.warn("A WARN Message");
        log.error("An ERROR Message");
        return "로그 레벨 확인";
    }

    @GetMapping("/logback")
    public String logback() {
        log.info("로깅");
        consoleLogger.info("콘솔 로깅");
        fileLogger.info("파일 로깅");
        return "로깅 파일을 확인해주세요.";
    }
}