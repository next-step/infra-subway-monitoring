package nextstep.subway.auth.application;

import nextstep.subway.auth.domain.LoginMember;
import nextstep.subway.auth.dto.TokenRequest;
import nextstep.subway.auth.dto.TokenResponse;
import nextstep.subway.auth.infrastructure.JwtTokenProvider;
import nextstep.subway.common.LogName;
import nextstep.subway.member.domain.Member;
import nextstep.subway.member.domain.MemberRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.function.Supplier;

@Service
@Transactional
public class AuthService {
    private static final String MISSING_EMAIL_MESSAGE_FORMAT = "존재하지 않는 이메일 [ %s ]이 입력 되었습니다.";
    private static final String MISSING_CREDENTIALS_MESSAGE = "올바르지 않은 인증 자격증명이 들어왔습니다.";

    private static final Logger CONSOLE_LOGGER = LoggerFactory.getLogger(LogName.CONSOLE.getLogName());
    private static final Logger FILE_LOGGER = LoggerFactory.getLogger(LogName.FILE.getLogName());

    private MemberRepository memberRepository;
    private JwtTokenProvider jwtTokenProvider;

    public AuthService(MemberRepository memberRepository, JwtTokenProvider jwtTokenProvider) {
        this.memberRepository = memberRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public TokenResponse login(TokenRequest request) {
        Member member = memberRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> authorizationException(request.getEmail()));
        member.checkPassword(request.getPassword());
        String token = jwtTokenProvider.createToken(request.getEmail());
        return new TokenResponse(token);
    }

    private AuthorizationException authorizationException(String email) {
        logErrors(formatMissingEmailMessage(email));
        return new AuthorizationException();
    }

    private String formatMissingEmailMessage(String email) {
        return String.format(MISSING_EMAIL_MESSAGE_FORMAT, email);
    }

    public LoginMember findMemberByToken(String credentials) {
        validateToken(credentials);
        String email = jwtTokenProvider.getPayload(credentials);
        Member member = memberRepository.findByEmail(email).orElseThrow(RuntimeException::new);
        return new LoginMember(member.getId(), member.getEmail(), member.getAge());
    }

    private void validateToken(String credentials) {
        if (!jwtTokenProvider.validateToken(credentials)) {
            logErrors(MISSING_CREDENTIALS_MESSAGE);
            throw new AuthorizationException();
        }
    }

    private void logErrors(String logMessage) {
        CONSOLE_LOGGER.error(logMessage);
        FILE_LOGGER.error(logMessage);
    }

}
