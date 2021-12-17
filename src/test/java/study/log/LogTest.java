package study.log;

import static net.logstash.logback.argument.StructuredArguments.kv;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LogTest {

    private static final Logger consoleLogger = LoggerFactory.getLogger("console");
    private static final Logger fileLogger = LoggerFactory.getLogger("file");
    private static final Logger jsonLogger = LoggerFactory.getLogger("json");

    @Test
    void testConsoleLog() {
        consoleLogger.trace("console log trace message");
        consoleLogger.debug("console log debug message");
        consoleLogger.info("console log info message");
        consoleLogger.warn("console log warn message");
        consoleLogger.error("console log error message");
    }

    @Test
    void testFileLog() {
        fileLogger.trace("file log trace message");
        fileLogger.debug("file log debug message");
        fileLogger.info("file log info message");
        fileLogger.warn("file log warn message");
        fileLogger.error("file log error message");
    }

    @Test
    void testJsonLog() {
        jsonLogger.info("{}, {}, {}",
            kv("orderNo", 1L),
            kv("memberNo", 2L),
            kv("deviceId", 3L)
        );
    }
}
