package nextstep.subway.common;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;

@Configuration
@Profile("prod")
public class InterceptorConfig implements WebMvcConfigurer {
    private static final List<String> URL_PATTERNS = Arrays
            .asList("/favorites/**",
                    "/join/**",
                    "/lines/**",
                    "/login/**",
                    "/members/**",
                    "/mypage/**",
                    "/path",
                    "/paths",
                    "/sections/**",
                    "/stations/**");

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new ApiLoggingInterceptor())
                .addPathPatterns(URL_PATTERNS);
    }
}
