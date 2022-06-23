package nextstep.subway.map.application;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import static net.logstash.logback.argument.StructuredArguments.kv;

@Aspect
@Component
public class MapLogAspect {
    private final Logger logger = LoggerFactory.getLogger("json");

    @Before("execution(* nextstep.subway.map.application.MapService.findPath(..))")
    public void findPathBefore(JoinPoint joinPoint) {
        final Long source = (Long)joinPoint.getArgs()[0];
        final Long target = (Long)joinPoint.getArgs()[1];
        logger.info("{} {}", kv("출발지", source), kv("도착지", target));
    }

}
