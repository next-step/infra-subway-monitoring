package nextstep.subway.auth.ui;

import lombok.extern.slf4j.Slf4j;
import nextstep.subway.auth.application.AuthService;
import nextstep.subway.auth.dto.TokenRequest;
import nextstep.subway.auth.dto.TokenResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class AuthController {
	private static final Logger fileLog = LoggerFactory.getLogger("fileLog");
	private AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("/login/token")
	public ResponseEntity<TokenResponse> login(@RequestBody TokenRequest request) {
        log.info("로그인 컨트롤러. email = {}", request.getEmail());
		TokenResponse token = authService.login(request);
        fileLog.info("로그인한 회원의 이메일 email = {}", request.getEmail());
		return ResponseEntity.ok().body(token);
	}
}
