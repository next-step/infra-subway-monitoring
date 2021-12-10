package nextstep.subway.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import nextstep.subway.interceptor.LoggingInterceptor;

@Configuration
public class LoggingInterceptorConfig implements WebMvcConfigurer {
	@Override
	public void addInterceptors(InterceptorRegistry registry) {

		registry.addInterceptor(new LoggingInterceptor())
			.addPathPatterns("/members/**")
			.addPathPatterns("/paths/**")
			.addPathPatterns("/login/**")
			.addPathPatterns("/lines/**")
			.addPathPatterns("/stations/**")
			.addPathPatterns("/favorites/**")
			.addPathPatterns("/error/**");

	}
}
