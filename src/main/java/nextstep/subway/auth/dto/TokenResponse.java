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
        return "발급된 토큰 [" +
                "accessToken='" + accessToken + '\'' +
                ']';
    }
}
