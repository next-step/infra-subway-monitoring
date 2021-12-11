package nextstep.subway.log;

import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Stream;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.CodeSignature;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.databind.ObjectMapper;

@Aspect
@Component
public class HttpLogAspect {

	private static final Logger LOGGER = LoggerFactory.getLogger(HttpLogAspect.class);

	private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

	@Around("within(nextstep.subway.*.ui..*)")
	public Object logAction(ProceedingJoinPoint joinPoint) throws Throwable {
		Object result = joinPoint.proceed(joinPoint.getArgs());
		String requestUrl = getRequestUrl(joinPoint);
		String parameters = OBJECT_MAPPER.writeValueAsString(params(joinPoint));
		String response = OBJECT_MAPPER.writeValueAsString(result);
		LOGGER.info(generateHttpLogText(requestUrl, parameters, response));
		return result;
	}

	private String generateHttpLogText(String requestUrl, String parameters, String response) {
		StringBuilder builder = new StringBuilder();
		builder.append("::: HTTP REQUEST :::");
		builder.append("\r\n");
		builder.append(requestUrl);
		builder.append("\r\n");
		builder.append("PARAMETERS: ");
		builder.append(parameters);
		builder.append("\r\n");
		builder.append("RESPONSE: ");
		builder.append(response);
		builder.append("\r\n");
		return builder.toString();
	}

	private String getRequestUrl(JoinPoint joinPoint) {
		MethodSignature methodSignature = (MethodSignature)joinPoint.getSignature();
		Method method = methodSignature.getMethod();

		return Stream.of(GetMapping.class, PutMapping.class, PostMapping.class,
				PatchMapping.class, DeleteMapping.class, RequestMapping.class)
			.filter(method::isAnnotationPresent)
			.map(mappingClass -> getUrl(method, mappingClass))
			.findFirst().orElse("");
	}

	private String getUrl(Method method, Class<? extends Annotation> annotationClass) {
		Annotation annotation = method.getAnnotation(annotationClass);
		String[] value;
		String httpMethod;
		try {
			value = (String[])annotationClass.getMethod("value").invoke(annotation);
			httpMethod = (annotationClass.getSimpleName().replace("Mapping", "")).toUpperCase();
		} catch (IllegalAccessException | NoSuchMethodException | InvocationTargetException e) {
			return null;
		}
		return String.format("%s %s", httpMethod, value.length > 0 ? value[0] : "");
	}

	private Map params(JoinPoint joinPoint) {
		CodeSignature codeSignature = (CodeSignature)joinPoint.getSignature();
		String[] parameterNames = codeSignature.getParameterNames();
		Object[] args = joinPoint.getArgs();
		Map<String, Object> params = new HashMap<>();
		for (int i = 0; i < parameterNames.length; i++) {
			params.put(parameterNames[i], args[i]);
		}
		return params;
	}
}
