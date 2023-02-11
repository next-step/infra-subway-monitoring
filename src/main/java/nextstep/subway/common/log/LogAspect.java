package nextstep.subway.common.log;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LogAspect {

  private static final String LOGGER_NAME = "file";
  private static final Logger logger = LoggerFactory.getLogger(LOGGER_NAME);
  private static final ThreadLocal<Long> THREAD_ID = new ThreadLocal<>();

  @Pointcut("execution(* nextstep.subway..*.*(..))")
  public void loggableMethods() {}

  @Around("loggableMethods()")
  public Object logEvent(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
    MethodSignature signature = (MethodSignature)proceedingJoinPoint.getSignature();

    long startTime = startLog(signature);
    try {
      Object result = proceedingJoinPoint.proceed();
      endLog(signature, startTime);
      return result;
    } catch (Throwable throwable) {
      exceptionLog(signature, startTime, throwable);
      throw throwable;
    }
  }

  private long startLog(MethodSignature signature) {
    long threadId = Thread.currentThread()
                          .getId();
    long startTime = System.currentTimeMillis();
    THREAD_ID.set(threadId);
    logger.info("[{}]: Start - {}", threadId, signature.toShortString());

    return startTime;
  }

  private void endLog(
      MethodSignature signature,
      long startTime
  ) {
    long threadId = THREAD_ID.get();
    long proceedTime = System.currentTimeMillis() - startTime;
    logger.info("[{}]: End(take {}ms) - {}", threadId, proceedTime, signature.toShortString());
  }

  private void exceptionLog(
      MethodSignature signature,
      long startTime,
      Throwable throwable
  ) {
    long threadId = THREAD_ID.get();
    long proceedTime = System.currentTimeMillis() - startTime;

    logger.info(
        "[{}]: Exception(take {} ms) - {} - {}", threadId, proceedTime, signature.toShortString(),
        throwable.getMessage()
    );
  }

}
