package nextstep.subway.common;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.Signature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ServiceLogger {
    private static Logger log;
    public static void log(ProceedingJoinPoint proceedingJoinPoint, LogStep logStep) {
        Signature signature = proceedingJoinPoint.getSignature();
        log = LoggerFactory.getLogger(signature.getDeclaringType());

        log.info("[service-" + logStep.getValue() + "-point] " + signature.getDeclaringTypeName() + " / " + signature.getName());
    }
}
