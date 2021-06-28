package nextstep.subway;

import nextstep.subway.line.ui.LineController;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
@Aspect
public class AopController {
    private static final Logger log = LoggerFactory.getLogger(LineController.class);
    private static final Logger fileLogger = LoggerFactory.getLogger("file");
    private static final Logger json = LoggerFactory.getLogger("json");

    @Around("execution(* nextstep.subway.*.ui.*Controller.*(..)) && !@target(nextstep.subway.NoLogging)")
    public Object logging(ProceedingJoinPoint proceedingJoinPoint) throws Throwable { // 2

        long start = System.currentTimeMillis();

        Object result = proceedingJoinPoint.proceed();
        String type = proceedingJoinPoint.getSignature().getDeclaringTypeName();

        long end = System.currentTimeMillis();

        fileLogger.info("=============================================================");
        fileLogger.info("Path : " +  type + "." + proceedingJoinPoint.getSignature().getName() + "()");
        fileLogger.info("Argument/Parameter : " + Arrays.toString(proceedingJoinPoint.getArgs()));
        fileLogger.info("Running Time : " + ( end - start ));
        fileLogger.info("=============================================================");

        return result;
    }
}
