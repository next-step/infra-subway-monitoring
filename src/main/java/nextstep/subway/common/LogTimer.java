package nextstep.subway.common;

import java.util.Arrays;

public class LogTimer {

    private final long currentTime;

    public LogTimer(long currentTimeMillis) {
        this.currentTime = currentTimeMillis;
    }

    public static LogTimer of() {
        return new LogTimer(System.currentTimeMillis());
    }

    public static long calculateTime(LogTimer endDateTime, LogTimer startDateTime) {
        return endDateTime.currentTime - startDateTime.currentTime;
    }
}
