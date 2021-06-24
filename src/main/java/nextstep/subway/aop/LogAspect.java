package nextstep.subway.aop;

import nextstep.subway.map.dto.PathResponse;
import nextstep.subway.member.dto.MemberResponse;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Aspect
@Component
public class LogAspect {
    private static final Logger memberLogger = LoggerFactory.getLogger("member");
    private static final Logger pathLogger = LoggerFactory.getLogger("path");

    @Pointcut("execution(* nextstep.subway.member.ui.*Controller.*(..))")
    public void memberPointCut() {
    }

    @Pointcut("execution(* nextstep.subway.map.ui.*Controller.*(..))")
    public void pathPointCut() {
    }

    @Before("memberPointCut()")
    public void printPreMemeberLog(JoinPoint joinPoint) {
        String method = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        memberLogger.info("[common pre-Log][" + method + "] input=>" + args[0].toString() + "====================");
    }

    @AfterReturning(value = "memberPointCut()", returning = "resultObject")
    public void printAfterMemeberLog(JoinPoint joinPoint, Object resultObject) {
        String method = joinPoint.getSignature().getName();
        if (resultObject instanceof ResponseEntity) {
            ResponseEntity responseEntity = (ResponseEntity) resultObject;
            checkMemberInfo(method, responseEntity);
        }
        memberLogger.info("[common after-Log][" + method + "] ============Member 정상 종료=======");
    }

    @Before("pathPointCut()")
    public void printPrePathLog(JoinPoint joinPoint) {
        String method = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();
        pathLogger.info("[common pre-Log][" + method + "] input=>" + args[0].toString() + "====================");
    }

    @AfterReturning(value = "pathPointCut()", returning = "resultObject")
    public void printAfterPathLog(JoinPoint joinPoint, Object resultObject) {
        String method = joinPoint.getSignature().getName();
        if (resultObject instanceof ResponseEntity) {
            ResponseEntity responseEntity = (ResponseEntity) resultObject;
            checkPathInfo(method, responseEntity);
        }
        pathLogger.info("[common after-Log][" + method + "] ============Path 정상 종료=======");
    }

    private void checkMemberInfo(String method, ResponseEntity responseEntity) {
        if (!Objects.isNull(responseEntity.getBody())) {
            MemberResponse loginMember = (MemberResponse) responseEntity.getBody();
            memberLogger.info("[common after-Log][" + method + "] " + loginMember.getEmail() + " 접속============");
        }
    }

    private void checkPathInfo(String method, ResponseEntity responseEntity) {
        if (!Objects.isNull(responseEntity.getBody())) {
            PathResponse pathResponse = (PathResponse) responseEntity.getBody();
            pathLogger.info("[common after-Log][" + method + "] 최단거리:" + pathResponse.getDistance() + " =========");
        }
    }
}
