import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Profile;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static net.logstash.logback.argument.StructuredArguments.kv;

@Profile("test")
@ExtendWith(SpringExtension.class)
public class LogTest {

    private static final Logger logger = LoggerFactory.getLogger(LogTest.class);
    private static final Logger fileLogger = LoggerFactory.getLogger("file");
    private static final Logger jsonFileLogger = LoggerFactory.getLogger("json_file");

    @Test
    public void test(){
        logger.error("An ERROR Message 테스트");
        fileLogger.info("file Log Messag 테스트");
        jsonFileLogger.info("{}, {}",
                kv("asdasda", "경기도 가평"),
                kv("도착지", "서울역")
        );
    }
}
