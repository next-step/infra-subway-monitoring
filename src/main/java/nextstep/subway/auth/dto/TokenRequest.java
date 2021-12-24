package nextstep.subway.auth.dto;

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
        final StringBuilder sb = new StringBuilder("TokenRequest{");
        sb.append("email='").append(email).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
