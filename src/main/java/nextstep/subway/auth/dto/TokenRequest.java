package nextstep.subway.auth.dto;

import static nextstep.subway.common.MaskingUtil.maskingAll;
import static nextstep.subway.common.MaskingUtil.maskingExceptFirst3;

public class TokenRequest {
    private String email;
    private String password;

    public TokenRequest() {
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
        return "TokenRequest{" +
            "email='" + maskingExceptFirst3(email) + '\'' +
            ", password='" + maskingAll(password) + '\'' +
            '}';
    }
}
