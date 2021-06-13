package nextstep.subway.auth.ui;

import nextstep.subway.auth.application.AuthService;
import nextstep.subway.auth.dto.TokenRequest;
import nextstep.subway.auth.dto.TokenResponse;
import nextstep.subway.common.LogName;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    private static final String LOGIN_MESSAGE_FORMAT = "[ {} ] 님이 로그인 했습니다.";
    private static final Logger CONSOLE_LOGGER = LoggerFactory.getLogger(LogName.CONSOLE.logName());
    private static final Logger FILE_LOGGER = LoggerFactory.getLogger(LogName.FILE.logName());

    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login/token")
    public ResponseEntity<TokenResponse> login(@RequestBody TokenRequest request) {
        TokenResponse token = authService.login(request);
        log(request);
        return ResponseEntity.ok().body(token);
    }

    private void log(TokenRequest request) {
        CONSOLE_LOGGER.info(LOGIN_MESSAGE_FORMAT, request.getEmail());
        FILE_LOGGER.info(LOGIN_MESSAGE_FORMAT, request.getEmail());
    }

}
