package nextstep.subway.auth.dto;

import org.apache.commons.lang3.StringUtils;

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
                "email='" + email + '\'' +
                ", password='" + StringUtils.overlay(password, StringUtils.repeat('*', password.length()), 0, password.length()) + '\'' +
                '}';
    }
}
