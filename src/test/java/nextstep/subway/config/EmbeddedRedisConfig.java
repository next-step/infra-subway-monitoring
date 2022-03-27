package nextstep.subway.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import redis.embedded.RedisServer;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@Profile("test")
@Configuration
public class EmbeddedRedisConfig {

    private RedisServer redisServer;

    @Value("${spring.redis.port}")
    private int redisPort;

    @PostConstruct
    public void redisServer() {
        if (redisServer == null || !redisServer.isActive()) {
            System.out.println("Redis Start");
            redisServer = RedisServer.builder()
                    .port(redisPort)
                    .setting("maxmemory 128M")  // 윈도우에서만 설정 필요
                    .build();
        }
        redisServer.start();
    }

    @PreDestroy
    public void stopRedis() {
        if (redisServer != null) {
            redisServer.stop();
            System.out.println("Redis Stop");
        }
    }
}
