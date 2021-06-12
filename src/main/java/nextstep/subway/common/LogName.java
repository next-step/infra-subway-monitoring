package nextstep.subway.common;

public enum LogName {

    CONSOLE("console"),
    FILE("file");

    private final String logName;

    LogName(String logName) {
        this.logName = logName;
    }

    public String getLogName() {
        return logName;
    }
}
