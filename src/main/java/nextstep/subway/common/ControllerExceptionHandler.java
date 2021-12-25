package nextstep.subway.common;

import nextstep.subway.favorite.domain.HasNotPermissionException;
import nextstep.subway.line.exception.NotFoundLineException;
import nextstep.subway.member.exception.NotFoundMemberException;
import nextstep.subway.station.exception.NotFoundStationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerExceptionHandler {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    @ExceptionHandler(HasNotPermissionException.class)
    public ResponseEntity handleHasNotPermissionException(HasNotPermissionException exception) {
        logger.error("HasNotPermissionException 발생. message :{}", exception.getMessage());
        return ResponseEntity.badRequest().build();
    }

    @ExceptionHandler(value = {NotFoundStationException.class, NotFoundMemberException.class, NotFoundLineException.class})
    public ResponseEntity handleNotFoundStationException(RuntimeException exception) {
        logger.error(exception.getClass().getName() + " 발생. message :{}", exception.getMessage());
        return ResponseEntity.noContent().build();
    }
}
