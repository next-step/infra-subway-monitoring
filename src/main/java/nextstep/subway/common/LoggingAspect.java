package nextstep.subway.common;

import nextstep.subway.map.dto.PathResponse;
import nextstep.subway.member.dto.MemberRequest;
import nextstep.subway.member.dto.MemberResponse;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Aspect
@Component
public class LoggingAspect {
    private static final Logger logger = LoggerFactory.getLogger("file");

    @Around("execution(* nextstep.subway.member.application.MemberService.createMember(..))")
    public Object executeCreateMember(ProceedingJoinPoint joinPoint) throws Throwable {
        String uuid = createId();
        try {
            String message = joinPoint.getSignature().toShortString();
            Object[] args = joinPoint.getArgs();

            logger.info("[{}] 회원가입 시작({}) - email: {}", uuid, message, ((MemberRequest) args[0]).getEmail());
            MemberResponse result = (MemberResponse) joinPoint.proceed();
            logger.info("[{} ] 회원가입 끝({}) - email: {}", uuid, message, result.getEmail());

            return result;
        } catch(Exception e) {
            logger.info("[{}] 회원가입 예외 - message: {}", uuid, e.getMessage());
            throw e;
        }
    }

    @Around("execution(* nextstep.subway.map.application.MapService.findPath(..))")
    public Object swayGraph(ProceedingJoinPoint joinPoint) throws Throwable {
        String uuid = createId();
        try {
            String message = joinPoint.getSignature().toShortString();
            Object[] args = joinPoint.getArgs();
            //
            logger.info("[{}] 길찾기 시작({}) - sourceStationId: {} , targetStationId: {} ", uuid, message, args[0], args[1]);
            PathResponse result = (PathResponse) joinPoint.proceed();
            logger.info("[{}] 길찾기 끝({}) - getStations: {}", uuid, message, result.getStations().toString());

            return result;
        } catch(Exception e) {
            logger.trace("[{}] 길찾기 예외처리 - message: {}", uuid, e.getMessage());
            throw e;
        }
    }

    private String createId() {
        return UUID.randomUUID().toString().substring(0, 8);
    }
}
