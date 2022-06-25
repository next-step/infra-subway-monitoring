package nextstep.subway.aop;

import nextstep.subway.station.domain.Station;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public final class JsonLogAspect {
    private final Logger logger = LoggerFactory.getLogger("json");

    @Before("execution(* nextstep.subway.map.application.PathService.findPath(..))")
    private void beforeLoggingFindPath(JoinPoint joinPoint) {
        final Object[] args = joinPoint.getArgs();
        final Station sourceStation = (Station) args[1];
        final Station targetStation = (Station) args[2];

        logger.info("find : {} to {}", sourceStation, targetStation);
    }

}
