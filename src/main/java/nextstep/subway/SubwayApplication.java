package nextstep.subway;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.time.LocalDateTime;

@EnableJpaRepositories
@EnableJpaAuditing
@SpringBootApplication
public class SubwayApplication {
    private static final Logger log = LoggerFactory.getLogger("console");

    public static void main(String[] args) {
        log();
        SpringApplication.run(SubwayApplication.class, args);
    }

    public static void log() {
        log.trace("A Trace Message");
        log.debug("A Debug Message");
        log.info("An Info Message : {}", LocalDateTime.now());
        log.warn("A Warn Message");
        log.error("An Error Message");
    }
}
