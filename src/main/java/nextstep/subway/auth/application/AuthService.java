package nextstep.subway.auth.application;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import nextstep.subway.auth.domain.LoginMember;
import nextstep.subway.auth.dto.TokenRequest;
import nextstep.subway.auth.dto.TokenResponse;
import nextstep.subway.auth.infrastructure.JwtTokenProvider;
import nextstep.subway.member.domain.Member;
import nextstep.subway.member.domain.MemberRepository;

@Service
@Transactional
public class AuthService {
	private static final Logger LOGGER = LoggerFactory.getLogger("file");

	private MemberRepository memberRepository;
	private JwtTokenProvider jwtTokenProvider;

	public AuthService(MemberRepository memberRepository, JwtTokenProvider jwtTokenProvider) {
		this.memberRepository = memberRepository;
		this.jwtTokenProvider = jwtTokenProvider;
	}

	public TokenResponse login(TokenRequest request) {
		Member member = memberRepository.findByEmail(request.getEmail()).orElseThrow(AuthorizationException::new);
		member.checkPassword(request.getPassword());

		String token = jwtTokenProvider.createToken(request.getEmail());
		LOGGER.info("로그인 후 토큰 발급완료");
		return new TokenResponse(token);
	}

	public LoginMember findMemberByToken(String credentials) {
		if (!jwtTokenProvider.validateToken(credentials)) {
			LOGGER.warn("유효하지 않은 토큰입니다.");
			throw new AuthorizationException();
		}

		String email = jwtTokenProvider.getPayload(credentials);
		Member member = memberRepository.findByEmail(email).orElseThrow(RuntimeException::new);
		LOGGER.info("로그인 유저 : {}", member);
		return new LoginMember(member.getId(), member.getEmail(), member.getAge());
	}
}
