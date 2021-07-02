package log;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import org.slf4j.LoggerFactory;
import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.read.ListAppender;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class FileLoggerTest {
    private Logger fileLogger;
    private ListAppender<ILoggingEvent> listAppender;

    @BeforeEach
    void setUp() {
        fileLogger = (Logger) LoggerFactory.getLogger("file");
        listAppender = new ListAppender<>();
        listAppender.start();
        fileLogger.addAppender(listAppender);
    }

    @DisplayName("FileLogger는 INFO 레벨로써 INFO 단계를 출력한다.")
    @Test
    void fileLoggerInfo() {
        //when
        fileLogger.info("Info 파일 로깅 입니다.");
        String actual = listAppender.list.get(0).getMessage();

        //then
        assertThat(actual).contains("Info 파일 로깅 입니다.");
    }

    @DisplayName("FileLogger는 INFO 레벨로써 WARN 단계를 출력한다.")
    @Test
    void fileLoggerWarn() {
        //when
        fileLogger.warn("Warn 파일 로깅 입니다.");
        String actual = listAppender.list.get(0).getMessage();

        //then
        assertThat(actual).contains("Warn 파일 로깅 입니다.");
    }

    @DisplayName("FileLogger는 INFO 레벨로써 ERROR 단계를 출력한다.")
    @Test
    void fileLoggerError() {
        //when
        fileLogger.error("Error 파일 로깅 입니다.");
        String actual = listAppender.list.get(0).getMessage();

        //then
        assertThat(actual).contains("Error 파일 로깅 입니다.");
    }

    @DisplayName("FileLogger는 INFO 레벨로써 DEBUG 단계를 출력하지 않는다.")
    @Test
    void fileLoggerDebug() {
        //when
        fileLogger.debug("Debug 파일 로깅 입니다.");
        List<ILoggingEvent> actual = listAppender.list;

        //then
        assertThat(actual.size()).isEqualTo(0);
    }

    @DisplayName("FileLogger는 INFO 레벨로써 TRACE 단계를 출력하지 않는다.")
    @Test
    void fileLoggerTrace() {
        //when
        fileLogger.debug("Trace 파일 로깅 입니다.");
        List<ILoggingEvent> actual = listAppender.list;

        //then
        assertThat(actual.size()).isEqualTo(0);
    }
}
