package nextstep.subway.auth.dto;

public class TokenResponse {
    private String accessToken;

    public TokenResponse() {
    }

    public TokenResponse(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("TokenResponse{");
        sb.append("accessToken='").append(accessToken).append('\'');
        sb.append('}');
        return sb.toString();
    }
}
