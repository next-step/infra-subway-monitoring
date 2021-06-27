package nextstep.subway.aop;

import nextstep.subway.annotation.SubwayLogging;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class SubwayLoggingAspect {

    private static final Logger log = LoggerFactory.getLogger(SubwayLoggingAspect.class);

    private static final Logger fileLog = LoggerFactory.getLogger("file-appender");
    private static final Logger jsonLog = LoggerFactory.getLogger("json-appender");

    @AfterReturning(value = "@annotation(nextstep.subway.annotation.SubwayLogging) && @annotation(subwayLogging)", returning = "response")
    public void writeLog(JoinPoint joinPoint, SubwayLogging subwayLogging, ResponseEntity response) {
        log.info("{} request parameter: {}, response status: {}, response body: {}",
                subwayLogging.description(), joinPoint.getArgs(), response.getStatusCode().value(), response.getBody());
        fileLog.info("{} request parameter: {}, response status: {}, response body: {}",
                subwayLogging.description(), joinPoint.getArgs(), response.getStatusCode().value(), response.getBody());
        jsonLog.info("{} request parameter: {}, response status: {}, response body: {}",
                subwayLogging.description(), joinPoint.getArgs(), response.getStatusCode().value(), response.getBody());
    }
}
