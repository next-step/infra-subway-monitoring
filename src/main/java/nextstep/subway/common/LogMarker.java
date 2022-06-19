package nextstep.subway.common;

import org.slf4j.Marker;
import org.slf4j.MarkerFactory;

public enum LogMarker {
    JSON(MarkerFactory.getMarker("json"));

    private Marker marker;

    LogMarker(Marker marker) {

        this.marker = marker;
    }

    public Marker getMarker() {
        return marker;
    }
}
