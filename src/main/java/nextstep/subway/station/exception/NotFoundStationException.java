package nextstep.subway.station.exception;

public class NotFoundStationException extends RuntimeException {
    public NotFoundStationException(Long id) {
        super("지하철역이 존재하지 않습니다. stationId : " + id);
    }
}
