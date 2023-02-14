package nextstep.subway.common.log;

import static net.logstash.logback.argument.StructuredArguments.kv;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class PathLoggingAspect {
    private static final Logger log = LoggerFactory.getLogger(LogConstant.FIND_PATH_LOGGER_NAME);

    @After("execution(* nextstep.subway.map.ui.MapController.findPath(..)) && args(source, target)")
    public void pathLogging(JoinPoint joinPoint, long source, long target) {
        log.info("{}, {}",
                kv("source", source),
                kv("target", target)
        );
    }
}
