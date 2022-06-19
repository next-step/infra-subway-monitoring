package nextstep.subway.aop;

import java.util.Arrays;

public class RequestLogVO {
    private final int requestId;
    private final Object target;
    private final Object[] args;
    private final String methodName;

    private RequestLogVO(int requestId, Object target, Object[] args, String methodName) {
        this.requestId = requestId;
        this.target = target;
        this.args = args;
        this.methodName = methodName;
    }

    public static RequestLogVO of(int requestId, Object target, Object[] args, String methodName) {
        return new RequestLogVO(requestId, target, args, methodName);
    }

    @Override
    public String toString() {
        return "RequestLogVO{" +
                "requestId=" + requestId +
                ", target=" + target +
                ", args=" + Arrays.toString(args) +
                ", methodName='" + methodName + '\'' +
                '}';
    }
}
