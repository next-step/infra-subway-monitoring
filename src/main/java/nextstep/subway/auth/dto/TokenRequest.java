package nextstep.subway.auth.dto;

import nextstep.subway.common.Mask;

public class TokenRequest {
    private String email;
    private String password;

    private TokenRequest() {
    }

    public TokenRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String toString() {
        return "email='" + Mask.displayEmailMasking(email);
    }
}
