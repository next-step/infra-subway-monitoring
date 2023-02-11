package nextstep.subway.auth.ui;

import lombok.extern.slf4j.Slf4j;
import nextstep.subway.auth.application.AuthService;
import nextstep.subway.auth.dto.TokenRequest;
import nextstep.subway.auth.dto.TokenResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login/token")
    public ResponseEntity<TokenResponse> login(@RequestBody TokenRequest request) {
        log.info("로그인 요청: {}", request.getEmail());
        TokenResponse token = authService.login(request);
        log.info("로그인 성공");
        return ResponseEntity.ok().body(token);
    }
}
