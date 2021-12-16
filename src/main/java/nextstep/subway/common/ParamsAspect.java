package nextstep.subway.common;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.CodeSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * packageName : nextstep.subway.common
 * fileName : ParamsAspect
 * author : haedoang
 * date : 2021-12-16
 * description :
 */
@Aspect
@Component
public class ParamsAspect {
    private static final Logger logger = LoggerFactory.getLogger("file");

    @Before("@annotation(LogParams)")
    public void logParams(JoinPoint joinPoint) {
        CodeSignature codeSignature = (CodeSignature) joinPoint.getSignature();
        String[] parameterNames = codeSignature.getParameterNames();
        Object[] args = joinPoint.getArgs();
        Map<String, Object> params = new HashMap<>();
        for (int i = 0; i < parameterNames.length; i++) {
            params.put(parameterNames[i], args[i]);
        }
        logger.info("parameters: {}", params);
    }
}
