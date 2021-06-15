package nextstep.subway.auth.application;

import nextstep.subway.auth.domain.LoginMember;
import nextstep.subway.auth.dto.TokenRequest;
import nextstep.subway.auth.dto.TokenResponse;
import nextstep.subway.auth.infrastructure.JwtTokenProvider;
import nextstep.subway.member.domain.Member;
import nextstep.subway.member.domain.MemberRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService {
    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    private static final Logger fileLog = LoggerFactory.getLogger("file");

    private MemberRepository memberRepository;
    private JwtTokenProvider jwtTokenProvider;

    public AuthService(MemberRepository memberRepository, JwtTokenProvider jwtTokenProvider) {
        this.memberRepository = memberRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public TokenResponse login(TokenRequest request) {
        try {
            Member member = memberRepository.findByEmail(request.getEmail()).orElseThrow(AuthorizationException::new);
            member.checkPassword(request.getPassword());
            log.info("Member #{} ({}) has logged in.", member.getId(), member.getEmail());
            fileLog.info("Member #{} ({}) has logged in.", member.getId(), member.getEmail());
            String token = jwtTokenProvider.createToken(request.getEmail());
            return new TokenResponse(token);
        } catch (AuthorizationException exception) {
            log.warn("Login failed ({})", request.getEmail());
            fileLog.warn("Login failed ({})", request.getEmail());
            throw exception;
        }
    }

    public LoginMember findMemberByToken(String credentials) {
        if (!jwtTokenProvider.validateToken(credentials)) {
            throw new AuthorizationException();
        }

        String email = jwtTokenProvider.getPayload(credentials);
        Member member = memberRepository.findByEmail(email).orElseThrow(RuntimeException::new);
        return new LoginMember(member.getId(), member.getEmail(), member.getAge());
    }
}
