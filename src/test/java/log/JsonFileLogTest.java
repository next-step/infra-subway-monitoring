package log;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.context.annotation.Profile;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import lombok.extern.slf4j.Slf4j;

@Slf4j(topic = "json_file")
@Profile("test")
@ExtendWith(SpringExtension.class)
public class JsonFileLogTest {

    @Test
    public void test(){
        log.info("json file log write test");
    }
}
