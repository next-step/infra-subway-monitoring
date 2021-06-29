package nextstep.subway.map.aspect;

import java.util.Arrays;
import java.util.stream.Collectors;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import nextstep.subway.map.domain.SubwayPath;

@Aspect
@Component
public class PathAspect {
    private final Logger logger = LoggerFactory.getLogger(PathAspect.class);

    @AfterReturning(value = "execution(* nextstep.subway.map.application.PathService.findPath(..))", returning = "subwayPath")
    public void afterReturnPath(JoinPoint joinPoint, SubwayPath subwayPath) {
        if (logger.isDebugEnabled()) {
            logger.debug("[{}] Input: {}, Output: {}", getSignature(joinPoint), getArgs(joinPoint), subwayPath.toString());
        }
    }

    private String getSignature(JoinPoint joinPoint) {
        return joinPoint.getSignature()
            .toShortString();
    }

    private String getArgs(JoinPoint joinPoint) {
        return Arrays.stream(joinPoint.getArgs())
            .map(Object::toString)
            .collect(Collectors.joining(", "));
    }
}
