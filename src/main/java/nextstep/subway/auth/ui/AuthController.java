package nextstep.subway.auth.ui;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import nextstep.subway.auth.application.*;
import nextstep.subway.auth.dto.*;

@RestController
public class AuthController {
    private AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login/token")
    public ResponseEntity<TokenResponse> login(@RequestBody TokenRequest request) {
        TokenResponse token = authService.login(request);
        return ResponseEntity.ok().body(token);
    }
}
