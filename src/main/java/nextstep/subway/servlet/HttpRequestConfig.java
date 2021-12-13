package nextstep.subway.servlet;

import java.util.Arrays;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class HttpRequestConfig {

    @Bean
    public FilterRegistrationBean reReadableRequestFilter() {
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean(
            new RequestFilter());
        filterRegistrationBean.setUrlPatterns(
            Arrays.asList("/*"));
        return filterRegistrationBean;
    }
}
