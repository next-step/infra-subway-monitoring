package nextstep.subway.common;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
public class AsyncThreadConfig {

    @Bean
    public Executor asyncThreadTaskExecutor() {
        ThreadPoolTaskExecutor exexcutor = new ThreadPoolTaskExecutor();
        /* 기본 Thread 사이즈 */
        exexcutor.setCorePoolSize(2);
        /* 최대 Thread 사이즈 */
        exexcutor.setMaxPoolSize(4);
        /* MaxThread가 동작하는 경우 대기하는 Queue 사이즈 */
        exexcutor.setQueueCapacity(100);
        exexcutor.setThreadNamePrefix("subway-async-");
        return exexcutor;
    }
}
