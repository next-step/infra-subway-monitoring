package nextstep.subway.auth.dto;

import nextstep.subway.common.Masking;

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
        return "TokenResponse{" +
            "accessToken='" + Masking.mask(accessToken,10) + '\'' +
            '}';
    }
}
