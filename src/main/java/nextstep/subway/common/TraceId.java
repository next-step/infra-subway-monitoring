package nextstep.subway.common;

import java.util.UUID;

public class TraceId {

    private String traceId;

    private TraceId(String traceId) {
        this.traceId = traceId;
    }

    public static TraceId of() {
        return new TraceId(createTraceId());
    }

    private static String createTraceId() {
        return UUID.randomUUID().toString().substring(0, 8);
    }

    @Override
    public String toString() {
        return String.valueOf(traceId);
    }
}
