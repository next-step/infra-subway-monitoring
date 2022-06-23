package nextstep.subway.member.application;

import nextstep.subway.member.dto.MemberRequest;
import nextstep.subway.member.dto.MemberResponse;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class MemberLogAspect {
    private final Logger logger = LoggerFactory.getLogger("file");

    @Pointcut("execution(public * nextstep.subway.member.application.MemberService.createMember(..))")
    private void createMember() {}

    @Around("createMember()")
    public Object advice(ProceedingJoinPoint pjp) throws Throwable {
        final MemberRequest memberRequest = (MemberRequest) pjp.getArgs()[0];
        logger.info("Request createMember >> " + memberRequest.getEmail());
        MemberResponse memberResponse = (MemberResponse) pjp.proceed();
        logger.info("created Member id >> " + memberResponse.getId());
        return memberResponse;
    }

}
