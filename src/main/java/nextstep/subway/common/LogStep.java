package nextstep.subway.common;

public enum LogStep {
    START("start"),
    END("end");

    private final String value;

    LogStep(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
