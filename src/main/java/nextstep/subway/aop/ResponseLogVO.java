package nextstep.subway.aop;

public class ResponseLogVO {
    private final int requestId;
    private final int statusCode;
    private final Object returnValue;
    private final String methodName;

    private ResponseLogVO(int requestId, int statusCode, Object returnValue, String methodName) {
        this.requestId = requestId;
        this.statusCode = statusCode;
        this.returnValue = returnValue;
        this.methodName = methodName;
    }

    public static ResponseLogVO of(int requestId, int statusCode, Object returnValue, String methodName) {
        return new ResponseLogVO(requestId, statusCode, returnValue, methodName);
    }

    @Override
    public String toString() {
        return "ResponseLogVO{" +
                "requestId=" + requestId +
                ", statusCode=" + statusCode +
                ", returnValue=" + returnValue +
                ", methodName='" + methodName + '\'' +
                '}';
    }
}
