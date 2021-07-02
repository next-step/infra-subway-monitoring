package nextstep.subway.aop;

import nextstep.subway.annotation.SubwayFileLogging;
import nextstep.subway.annotation.SubwayJsonLogging;
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

    @AfterReturning(value = "@annotation(nextstep.subway.annotation.SubwayFileLogging) && @annotation(subwayFileLogging)", returning = "response")
    public void writeFileLog(JoinPoint joinPoint, SubwayFileLogging subwayFileLogging, ResponseEntity response) {
        writeCommandLog(joinPoint, response, subwayFileLogging.description());
        jsonLog.info("{} request parameter: {}, response status: {}, response body: {}",
                subwayFileLogging.description(), joinPoint.getArgs(), response.getStatusCode().value(), response.getBody());
    }

    @AfterReturning(value = "@annotation(nextstep.subway.annotation.SubwayFileLogging) && @annotation(subwayJsonLogging)", returning = "response")
    public void writeFileLog(JoinPoint joinPoint, SubwayJsonLogging subwayJsonLogging, ResponseEntity response) {
        writeCommandLog(joinPoint, response, subwayJsonLogging.description());
        jsonLog.info("{} request parameter: {}, response status: {}, response body: {}",
                subwayJsonLogging.description(), joinPoint.getArgs(), response.getStatusCode().value(), response.getBody());
    }

    private void writeCommandLog(JoinPoint joinPoint, ResponseEntity response, String description) {
        log.info("{} request parameter: {}, response status: {}, response body: {}",
                description, joinPoint.getArgs(), response.getStatusCode().value(), response.getBody());
    }
}
