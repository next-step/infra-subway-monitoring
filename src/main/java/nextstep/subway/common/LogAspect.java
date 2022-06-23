package nextstep.subway.common;

import java.time.LocalDateTime;
import java.util.UUID;
import javax.servlet.http.HttpServletRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class LogAspect {

    private static final Logger log = LoggerFactory.getLogger("console");
    private static final String AOP_UUID = "AOP_UUID";

    /**
     * execution : 반환타입, 타입, 메소드, 파라미터 기준 실행시점 설정 within : 특정 경로의 타입 기준 실행 시점 설정 this/target : 특정
     * 타입의 객체 기준 실행 시점 설정
     *
     * @target : 특정 어노테이션 갖는 객체 기준 실행 시점 지정
     * @args: 특정 어노테잉션의 파라미터를 가지는 메소드 기준 실행 시점 지정
     * @within : 특정 경로의 어노테이션을 기준으로 실행 시점 지정
     * @annotation : 특정 어노테이션 기준으로 실행 시점 지정
     */

    @Pointcut("within(nextstep.subway.*.ui.*Controller)")
    public void allMethodInControllers() {
    }

    @Before("allMethodInControllers()")
    public void loggingBefore(JoinPoint jp) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        request.setAttribute(AOP_UUID, UUID.randomUUID().toString());

        log.trace("START...{}...{}", request.getAttribute(AOP_UUID), LocalDateTime.now());
        log.trace("ACCESS...{}...{}", jp.getSignature().getDeclaringTypeName(),
            jp.getSignature().getName());

        Object[] args = jp.getArgs();
        for (Object arg : args) {
            log.trace("ARG...{}", arg.toString());
        }
    }

    @After("allMethodInControllers()")
    public void loggingAfter(JoinPoint jp) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        log.trace("END...{}...{}", request.getAttribute(AOP_UUID), LocalDateTime.now());
    }

}

/**
 * pointcut : 어느 부분에 AOP를 설정할지 정의 제어자, 반환타입, 패키지, 클래스, 이름, 파라미터, 예외를 통해 pointCut 작성 JoinPoint : 언제
 * AOP설정할지 정의 메서드 실행 전 ( before ) 메서드 실행 후 ( after ) 반환된 후 ( AfterReturning ) 예외가 던져지는 시점 (
 * AfterThrowing ) 메서드 실행 전, 후 ( around ) advice : AOP에 삽입될 모듈 자체(what)을 의미
 */
