package nextstep.subway.common.log;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public enum Loggers {

    FILE("file"),
    JSON("json");

    private final String name;

    Loggers(String name) {
        this.name = name;
    }

    public Logger logger() {
        return LoggerFactory.getLogger(this.name);
    }
}
