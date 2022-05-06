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

import static net.logstash.logback.argument.StructuredArguments.kv;

@RestController
public class AuthController {

    private static final Logger jsonLogger = LoggerFactory.getLogger("json");

    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login/token")
    public ResponseEntity<TokenResponse> login(@RequestBody TokenRequest request) {
        jsonLogger.info("{}",
                kv("login_email", request.getEmail())
        );
        TokenResponse token = authService.login(request);
        return ResponseEntity.ok().body(token);
    }
}
