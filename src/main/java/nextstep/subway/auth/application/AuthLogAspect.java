package nextstep.subway.auth.application;

import nextstep.subway.auth.dto.TokenRequest;
import nextstep.subway.auth.dto.TokenResponse;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AuthLogAspect {

    private final Logger logger = LoggerFactory.getLogger("file");

    @Pointcut("execution(public * nextstep.subway.auth.application.AuthService.login(..))")
    private void login() {}

    @Around("login()")
    public Object advice(ProceedingJoinPoint pjp) throws Throwable {
        final TokenRequest tokenRequest = (TokenRequest) pjp.getArgs()[0];
        logger.info("Request Login >> " + tokenRequest.getEmail());
        TokenResponse tokenResponse = (TokenResponse) pjp.proceed();
        logger.info("is success login >> "+tokenResponse.getAccessToken());
        return tokenResponse;
    }
}
