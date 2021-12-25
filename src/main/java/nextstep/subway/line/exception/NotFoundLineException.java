package nextstep.subway.line.exception;

public class NotFoundLineException extends RuntimeException {
    public NotFoundLineException(Long id) {
        super("지하철역이 존재하지 않습니다. lineId : " + id);
    }
}
