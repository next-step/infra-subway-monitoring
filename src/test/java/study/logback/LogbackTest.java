package study.logback;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LogbackTest {
    private static final Logger log = LoggerFactory.getLogger("console");
    private static final Logger file = LoggerFactory.getLogger("file");
    private static final Logger json = LoggerFactory.getLogger("json");

    @Test
    void 콘솔로그_레벨을_확인한다() {
        log.trace("Trace Message");
        log.debug("Debug Message");
        log.info("Info Message");
        log.warn("Warn Message");
        log.error("Error Message");
    }

    @Test
    void 파일로그_레벨을_확인한다() {
        file.trace("Trace Message");
        file.debug("Debug Message");
        file.info("Info Message");
        file.warn("Warn Message");
        file.error("Error Message");
    }

    @Test
    void 제이슨_파일로그_레벨을_확인한다() {
        json.trace("Trace Message");
        json.debug("Debug Message");
        json.info("Info Message");
        json.warn("Warn Message");
        json.error("Error Message");
    }
}
