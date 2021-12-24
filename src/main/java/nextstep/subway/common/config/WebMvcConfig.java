package nextstep.subway.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import nextstep.subway.common.logging.LogInterceptor;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    private final LogInterceptor logInterceptor;

    public WebMvcConfig(LogInterceptor logInterceptor) {
        this.logInterceptor = logInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(logInterceptor)
            .addPathPatterns("/lines/**")
            .addPathPatterns("/favorites/**")
            .addPathPatterns("/paths/**")
            .addPathPatterns("/members/**")
            .addPathPatterns("/stations/**");
    }
}
