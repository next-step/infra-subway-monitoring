package log;

import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.read.ListAppender;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.slf4j.LoggerFactory;

import static org.assertj.core.api.Assertions.assertThat;

class ConsoleLoggerTest {
    private Logger consoleLogger;
    private ListAppender<ILoggingEvent> listAppender;

    @BeforeEach
    void setUp() {
        consoleLogger = (Logger) LoggerFactory.getLogger("console");
        listAppender = new ListAppender<>();
        listAppender.start();
        consoleLogger.addAppender(listAppender);
    }

    @DisplayName("ConsoleLogger는 TRACE 레벨로써 TRACE 단계를 출력한다.")
    @Test
    void consoleLoggerTrace() {
        //when
        consoleLogger.trace("Trace 콘솔 로깅 입니다.");
        String actual = listAppender.list.get(0).getMessage();

        //then
        assertThat(actual).contains("Trace 콘솔 로깅 입니다.");
    }

    @DisplayName("ConsoleLogger는 TRACE 레벨로써 DEBUG 단계를 출력한다.")
    @Test
    void consoleLoggerDebug() {
        //when
        consoleLogger.debug("Debug 콘솔 로깅 입니다.");
        String actual = listAppender.list.get(0).getMessage();

        //then
        assertThat(actual).contains("Debug 콘솔 로깅 입니다.");
    }

    @DisplayName("ConsoleLogger는 TRACE 레벨로써 INFO 단계를 출력한다.")
    @Test
    void consoleLoggerInfo() {
        //when
        consoleLogger.info("Info 콘솔 로깅 입니다.");
        String actual = listAppender.list.get(0).getMessage();

        //then
        assertThat(actual).contains("Info 콘솔 로깅 입니다.");
    }

    @DisplayName("ConsoleLogger는 TRACE 레벨로써 WARN 단계를 출력한다.")
    @Test
    void consoleLoggerWarn() {
        //when
        consoleLogger.warn("Warn 콘솔 로깅 입니다.");
        String actual = listAppender.list.get(0).getMessage();

        //then
        assertThat(actual).contains("Warn 콘솔 로깅 입니다.");
    }

    @DisplayName("ConsoleLogger는 TRACE 레벨로써 ERROR 단계를 출력한다.")
    @Test
    void consoleLoggerError() {
        //when
        consoleLogger.error("Error 콘솔 로깅 입니다.");
        String actual = listAppender.list.get(0).getMessage();

        //then
        assertThat(actual).contains("Error 콘솔 로깅 입니다.");
    }
}
