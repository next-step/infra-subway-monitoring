package nextstep.subway.common;

import static net.logstash.logback.argument.StructuredArguments.entries;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

public class LogAspectHolder {

    private static final Logger log = LoggerFactory.getLogger("file");

    @Aspect
    @Order(1)
    @Component
    static public class ContextAspect {

        @Around("execution(* nextstep..*Controller.*(..))")
        public Object beforeController(ProceedingJoinPoint joinPoint) throws Throwable {
            MDC.put("ContextId", UUID.randomUUID().toString().substring(0, 6));
            Object result = joinPoint.proceed();
            MDC.remove("ContextId");
            return result;
        }
    }

    @Aspect
    @Order(2)
    @Component
    static public class LoggingAspect {

        @Around("execution(public * nextstep..*(..))")
        public Object logContext(ProceedingJoinPoint joinPoint) throws Throwable {
            Map commonArguments = commonArguments();

            String signature = joinPoint.getSignature().toShortString();
            log.info("Start {}", signature, entries(commonArguments), entries(inputArgument(joinPoint)));

            long startTime = System.currentTimeMillis();
            Object result = joinPoint.proceed();
            long endTime = System.currentTimeMillis();
            long methodExecTime = endTime - startTime;

            Map outputArguments = outputArguments(result, methodExecTime);

            if (isController(joinPoint) && methodExecTime > 3000) {
                log.warn("End {} Too Long Time", signature, outputArguments);
                return result;
            }

            log.info("End {}", signature, entries(commonArguments), entries(outputArguments));

            return result;
        }

        private Map commonArguments() {
            Map map = new HashMap();
            map.put("LogId", UUID.randomUUID().toString().substring(0, 6));
            return map;
        }

        private Map inputArgument(JoinPoint joinPoint) {
            Object[] args = joinPoint.getArgs();
            Map map = new HashMap();
            for (int i = 0; i < args.length; i++) {
                map.put("Input " + i, args[i]);
            }
            return map;
        }

        private boolean isController(ProceedingJoinPoint joinPoint) {
            return joinPoint.getTarget().getClass().getSimpleName().endsWith("Controller");
        }

        private Map outputArguments(Object output, long time) {
            Map map = new HashMap();
            map.put("Output", output);
            map.put("Time", time + "ms");
            return map;
        }
    }
}
