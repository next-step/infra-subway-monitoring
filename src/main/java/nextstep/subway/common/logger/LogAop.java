package nextstep.subway.common.logger;


import java.lang.reflect.Method;
import javax.servlet.http.HttpServletRequest;
import nextstep.subway.common.RequestUtils;
import nextstep.subway.common.TraceId;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

@Aspect
@Component
public class LogAop {

    private static final Logger logger = LoggerFactory.getLogger(LogAop.class);

    @Pointcut("within(nextstep.subway.*.ui.*Controller)")
    public void controller() {
    }

    @Around("nextstep.subway.common.logger.LogAop.controller()")
    private Object controller(ProceedingJoinPoint joinPoint) throws Throwable {
        HttpServletRequest request = RequestUtils.request();
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();
        try {
            logger.info("=======================================================");
            logger.info("TRACE_ID: {}", TraceId.of());
            logger.info("REQUEST_URI: {}", request.getRequestURI());
            logger.info("METHOD_NAME: {}", request.getMethod());
            logger.info("METHOD_SIGNATURE: {}", joinPoint.getSignature());
            logger.info("PARAMETER {}", joinPoint.getArgs());
            logger.info("=======================================================");
            Object proceed = joinPoint.proceed(joinPoint.getArgs());
            stopWatch.stop();
            return proceed;
        } catch (Exception e) {
            logger.info("==================예외발생 START=================");
            logger.error(e.getMessage());
            logger.info("==================예외발생  END =================");
            throw e;
        } finally {
            logger.info(stopWatch.prettyPrint());
        }
    }

    @AfterReturning(value = "controller()", returning = "responseData")
    public void afterReturnLog(JoinPoint joinPoint, Object responseData) {
        // 메서드 정보 받아오기
        logger.info("======= method name = {} =======", joinPoint.getSignature().getName());

        logger.info("return type = {}", responseData.getClass().getSimpleName());
        logger.info("return value = {}", responseData);
    }
}
