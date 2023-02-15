package nextstep.subway.common.log;

import nextstep.subway.auth.dto.TokenRequest;
import nextstep.subway.member.dto.MemberRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class UserConnectLoggingAspect {
    private static final Logger log = LoggerFactory.getLogger(LogConstant.USER_CONNECT_LOGGER_NAME);

    @AfterReturning("execution(* nextstep.subway.auth.ui.AuthController.login(*)) && args(request)")
    public void loginLogging(JoinPoint joinPoint, TokenRequest request) {
        String email = request.getEmail();
        log.info("[USER_LOGIN]-{}", email);
    }

    @AfterReturning("execution(* nextstep.subway.member.ui.MemberController.createMember(*)) && args(request)")
    public void joinLogging(JoinPoint joinPoint, MemberRequest request) {
        String email = request.getEmail();
        log.info("[USER_JOIN]-{}", email);
    }
}
