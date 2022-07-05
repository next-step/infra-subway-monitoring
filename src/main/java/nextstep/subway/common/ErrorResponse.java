package nextstep.subway.common;

public class ErrorResponse {
    private String message;
    private int status;

    public ErrorResponse(String message) {
        this.message = message;
    }

    public ErrorResponse(String message, int status) {
        this.message = message;
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public int getStatus() {
        return status;
    }
}
