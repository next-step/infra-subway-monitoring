package nextstep.subway;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
@EnableJpaAuditing
@SpringBootApplication
public class SubwayApplication {
    private static final Logger logger = LoggerFactory.getLogger(SubwayApplication.class);
    public static void main(String[] args) {
        logger.debug("실행");
        SpringApplication.run(SubwayApplication.class, args);
    }

}
