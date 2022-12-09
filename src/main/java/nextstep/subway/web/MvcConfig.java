package nextstep.subway.web;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.concurrent.TimeUnit;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        CacheControl cacheControl = CacheControl.maxAge(7, TimeUnit.DAYS)
                .mustRevalidate();

        registry.addResourceHandler("js/.js", "images/.png")
                .addResourceLocations("classpath:/static")
                .setCacheControl(cacheControl);
    }
}
