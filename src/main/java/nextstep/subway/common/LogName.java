package nextstep.subway.common;

public enum LogName {

    CONSOLE("console"),
    FILE("file"),
    JSON("json");

    private final String logName;

    LogName(String logName) {
        this.logName = logName;
    }

    public String logName() {
        return logName;
    }
}
