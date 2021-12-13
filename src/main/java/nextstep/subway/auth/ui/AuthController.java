package nextstep.subway.auth.ui;

import nextstep.subway.auth.application.AuthService;
import nextstep.subway.auth.dto.TokenRequest;
import nextstep.subway.auth.dto.TokenResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    public static final String MESSAGE_SIGN_IN = " 님이 로그인을 시도했습니다";
    private AuthService authService;
    private Logger fileLogger = LoggerFactory.getLogger("file");

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login/token")
    public ResponseEntity<TokenResponse> login(@RequestBody TokenRequest request) {
        fileLogger.info(request.getEmail() + MESSAGE_SIGN_IN);
        TokenResponse token = authService.login(request);
        return ResponseEntity.ok().body(token);
    }
}
